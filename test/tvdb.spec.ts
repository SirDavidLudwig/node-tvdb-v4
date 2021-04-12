import { config } from "dotenv";
import chaiAsPromised from "chai-as-promised";
import { expect, use, should } from "chai";
import "mocha";

/**
 * Load the environment configuration
 */
config();

/**
 * Use the chai-as-promised plugin
 */
use(chaiAsPromised);
use(should);

// Helper Functions --------------------------------------------------------------------------------

import { test, testRecord, testRecords} from "./utils";
import * as util from "./utils";

// -------------------------------------------------------------------------------------------------

import TVDB, { StatusError } from "../src/";
import ApiRequestManager from "../src/request";
import * as Schema from "../src/schema";

// Tests -------------------------------------------------------------------------------------------

describe("TVDB", () => {

	// Create a new instance of TVDB
	let tvdb = new TVDB(<string>process.env["API_KEY"]);

	/**
	 * Check the custom status error for the API requests
	 */
	describe("API Status Error", () => {
		let error = new StatusError(undefined, 200);
		it("should have status code of 200", () => {
			expect(error.statusCode).to.equal(200);
		});
	});

	/**
	 * API Request Manager
	 */
	describe("Request Manager", () => {
		describe("Timeout Handling", () => {
			let requestManager = new ApiRequestManager({ timeout: 1 });
			it("should timeout", () => {
				return requestManager.get("/").should.be.rejected;
			});
		});
	});

	/**
	 * Login
	 */
	describe("Login", () => {
		describe("Bad Parameters", () => {
			it("should properly reject bad API key", async () => {
				return tvdb.login().should.eventually.be.rejectedWith(StatusError);
			});
			it("should properly reject with valid API key and invalid PIN", () => {
				return tvdb.login().should.eventually.be.rejectedWith(StatusError);
			});
		});
		describe("Valid Parameters", () => {
			it("should login successfully with valid API key and PIN", () => {
				return tvdb.login(<string>process.env["PIN"]).should.be.fulfilled;
			});
		});
	});

	/**
	 * Artwork Information
	 */
	describe("Artwork", () => {
		describe("Fetch an artwork record", () => {
			testRecord(() => tvdb.artwork(31673), [
				"id", "image", "language", "score", "thumbnail", "type"
			]);
		});
		describe("Fetch an extended artwork record", () => {
			testRecord(() => tvdb.artworkExtended(31673), [
				"id", "image", "language", "score", "thumbnail", "type", "episodeId",
				"height", "movieId", "networkId", "peopleId", "seasonId", "seriesId",
				"seriesPeopleId", "status", "tagOptions", "thumbnailHeight", "thumbnailWidth",
				"updatedAt", "width"
			],
			(artwork) => {
				expect(artwork.updatedAt).to.be.an.instanceOf(Date);
			});
		});
	});

	/**
	 * Award Information
	 */
	describe("Awards", () => {
		const CATEGORY_KEYS = [
			"id", "name", "allowCoNominees", "forSeries", "forMovies", "award"
		];
		describe("Fetch all awards", () => {
			testRecords(() => tvdb.allAwards(), ["id", "name"]);
		});
		describe("Fetch an award record", () => {
			testRecord(() => tvdb.award(1), ["id", "name"]);
		});
		describe("Fetch an extended award record", () => {
			testRecord(() => tvdb.awardExtended(1), ["id", "name", "score", "categories"]);
		});
		describe("Fetch an award category record", () => {
			testRecord(() => tvdb.awardCategory(1), CATEGORY_KEYS);
		});
		describe("Fatch an extended award record", () => {
			testRecord(() => tvdb.awardCategoryExtended(1), [...CATEGORY_KEYS, "nominees"],
				(category) => {
					util.expectCharacterToBeParsed(category.nominees[0].character, true);
					util.expectEpisodeToBeParsed(category.nominees[0].episode, true);
					util.expectSeriesToBeParsed(category.nominees[0].series, true);
					util.expectNullableNumber(category.nominees[0].year);
				}
			);
		});
	});

	/**
	 * Character information
	 */
	describe("Characters", () => {
		describe("Fetch a character record", () => {
			testRecord(() => tvdb.character(65120457), [
					"aliases", "episodeId", "id", "image", "isFeatured", "movieId", "name",
					"nameTranslations", "overviewTranslations", "peopleId", "peopleType", "person",
					"seriesId", "sort", "type", "url"
				],
				util.expectCharacterToBeParsed
			);
		});
	});

	/**
	 * Company information
	 */
	describe("Companies", () => {
		const KEYS = [
			"activeDate", "aliases", "country", "id", "inactiveDate", "name", "nameTranslations",
			"overviewTranslations", "primaryCompanyType", "slug"
		];
		describe("Fetch all company records", () => {
			testRecords(() => tvdb.allCompanies(), KEYS, undefined,
				test("should have different set of results with different page", async (company) => {
					let results = await tvdb.allCompanies(1);
					expect(results[0].name).to.not.equal(company.name);
				})
			);
		});
		describe("Fetch a company record", () => {
			testRecord(() => tvdb.company(1), KEYS, (company) => {
				util.expectNullableDate(company.activeDate);
				util.expectNullableDate(company.inactiveDate);
			});
		});
	});

	/**
	 * Episode Information
	 */
	describe("Episodes", () => {
		const BASE_KEYS = [
			"aired", "id", "image", "imageType", "isMovie", "name", "nameTranslations", "number",
			"overviewTranslations", "runtime", "seasonNumber", "seasons", "seriesId",
		];
		describe("Fetch an episode record", () => {
			testRecord(() => tvdb.episode(341283), BASE_KEYS, util.expectEpisodeToBeParsed);
		});
		describe("Fetch an extended episode record", () => {
			testRecord(() => tvdb.episodeExtended(341283), [...BASE_KEYS, "airsAfterSeason",
				"airsBeforeEpisode", "airsBeforeSeason", "awards", "characters", "contentRatings",
				"productionCode", "remoteIds", "tagOptions", "trailers"
			],
			(episode) => {
				util.expectEpisodeToBeParsed(episode);
				util.expectCharacterToBeParsed(episode.characters[0]);
			});
		});
	});

	/**
	 * Fetch meta-info
	 */
	describe("Meta-info", () => {
		describe("Content-ratings", () => {
			testRecords(() => tvdb.contentRatings(), ["id", "name", "country", "contentType",
				"order", "description", "fullname"]);
		});
		describe("Countries", () => {
			testRecords(() => tvdb.countries(), ["id", "name", "shortCode"]);
		});
		describe("Genders", () => {
			testRecords(() => tvdb.genders(), ["id", "name"]);
		});
		describe.skip("Languages", () => {
			// Language related stuff does not currently work TVDB's API
		});
		describe("Genres", () => {
			describe("All genres", () => {
				testRecords(() => tvdb.allGenres(), ["id", "name", "slug"]);
			});
			describe("Genre lookup", () => {
				testRecord(() => tvdb.genre(1), ["id", "name", "slug"]);
			});
		});
		describe("Entity Updates", () => {
			let timestamp: number = Math.floor(Date.now()/1000) - 60*60*24;
			describe("Fetch updates using raw timestamp", () => {
				testRecords(() => tvdb.updates(timestamp), [
						"entityType", "method", "recordId", "timeStamp"
					],
					(update) => {
						expect(update.timeStamp).to.be.an.instanceOf(Date);
					}
				);
			});
			describe("Fetch updates using a Date object", () => {
				testRecords(() => tvdb.updates(new Date(timestamp * 1000)), [
						"entityType", "method", "recordId", "timeStamp"
					],
					(update) => {
						expect(update.timeStamp).to.be.an.instanceOf(Date);
					}
				);
			});
		});
	});

	/**
	 * List Information
	 */
	describe("Lists", () => {
		const BASE_KEYS = [
			"aliases", "id", "isOfficial", "name", "nameTranslations", "overview",
			"overviewTranslations", "url"
		];
		describe("All lists", () => {
			testRecords(() => tvdb.allLists(), BASE_KEYS, undefined,
				test("should have different set of results with different page", async (list) => {
					let results = await tvdb.allLists(1);
					expect(results[0].name).to.not.equal(list.name);
				})
			);
		});
		describe("Fetch a base list record", () => {
			testRecord(() => tvdb.list(1), BASE_KEYS);
		});
		describe("Fetch an extended list record", () => {
			testRecord(() => tvdb.listExtended(1), [...BASE_KEYS, "entities", "score"]);
		});
	});

	/**
	 * Movie Information
	 */
	describe("Movies", () => {
		const BASE_KEYS = [
			"aliases", "id", "image", "name", "nameTranslations", "overviewTranslations", "score",
			"slug", "status"
		];
		describe("All movies", () => {
			testRecords(() => tvdb.allMovies(), BASE_KEYS);
		});
		describe("Fetch a movie record", () => {
			testRecord(() => tvdb.movie(347), BASE_KEYS);
		});
		describe("Fetch an extended movie record", () => {
			testRecord(() => tvdb.movieExtended(347), [...BASE_KEYS, "artworks", "audioLanguages",
					"awards", "boxOffice", "budget", "characters", "lists", "genres",
					"originalCountry", "originalLanguage", "releases", "remoteIds", "studios",
					"subtitleLanguages", "tagOptions", "trailers"
				],
				util.expectMovieToBeParsed
			);
		});
	});

	/**
	 * People Information
	 */
	describe("People", () => {
		const BASE_KEYS = [
			"aliases", "id", "image", "name", "score", "nameTranslations", "overviewTranslations"
		];
		describe("Fetch a person record", () => {
			testRecord(() => tvdb.person(294100), BASE_KEYS);
		});
		describe("Fetch an extended person record", () => {
			testRecord(() => tvdb.personExtended(294100), [
					...BASE_KEYS, "awards", "biographies", "birth", "birthPlace", "characters",
					"death", "gender", "races", "remoteIds", "tagOptions"
				],
				(person) => {
					util.expectNullableDate(person.birth);
					util.expectNullableDate(person.death);
					expect(person.characters).to.not.be.empty;
					util.expectCharacterToBeParsed(person.characters[0]);
				}
			);
		});
	});

	/**
	 * Fetch all statuses
	 */
	describe("Statuses", () => {
		describe("Artwork statuses", () => {
			testRecords(() => tvdb.artworkStatuses(), ["id", "name"]);
		});
		describe("Movie statuses", () => {
			testRecords(() => tvdb.movieStatuses(), ["id", "name", "recordType", "keepUpdated"]);
		});
		describe("Series statuses", () => {
			testRecords(() => tvdb.seriesStatuses(), ["id", "name", "recordType", "keepUpdated"]);
		});
	});

	/**
	 * Search Functionality
	 */
	describe("Search", () => {
		const KEYS = [
			"country", "id", "image_url", "name", "name_translated", "network", "overview",
			"primary_language", "primary_type", "status", "tvdb_id", "type"
		];
		describe("Search movies", () => {
			let results: Schema.ISearchResult[];
			it("should fetch a record", async () => {
				results = await tvdb.search("south park", "movie");
				expect(results).to.not.be.undefined;
			});
			it("should be a list of records", () => {
				expect(results).to.be.an.instanceOf(Array);
				expect(results).to.not.be.empty;
			});
			it("should have required keys", () => {
				expect(results[0]).to.include.all.keys(...KEYS);
			});
			it("should have parsed records", () => {
				util.expectNullableString(results[0].country);
				util.expectNullableString(results[0].image_url);
				util.expectNullableString(results[0].name_translated);
				util.expectNullableString(results[0].network);
				util.expectNullableString(results[0].overview);
				util.expectNullableString(results[0].primary_language);
				util.expectNullableString(results[0].primary_type);
				util.expectNullableString(results[0].status);
				util.expectNullableNumber(results[0].tvdb_id);
				util.expectNullableNumber(results[0].year);
				expect(results[0].type).to.equal("movie");
			});
		});
		describe("Search series", () => {
			let results: Schema.ISearchResult[];
			it("should fetch a record", async () => {
				results = await tvdb.search("south park", "series");
				expect(results).to.not.be.undefined;
			});
			it("should be a list of records", () => {
				expect(results).to.be.an.instanceOf(Array);
				expect(results).to.not.be.empty;
			});
			it("should have required keys", () => {
				expect(results[0]).to.include.all.keys(...KEYS);
			});
			it("should have parsed records", () => {
				util.expectNullableString(results[0].country);
				util.expectNullableString(results[0].image_url);
				util.expectNullableString(results[0].name_translated);
				util.expectNullableString(results[0].network);
				util.expectNullableString(results[0].overview);
				util.expectNullableString(results[0].primary_language);
				util.expectNullableString(results[0].primary_type);
				util.expectNullableString(results[0].status);
				util.expectNullableNumber(results[0].tvdb_id);
				util.expectNullableNumber(results[0].year);
				expect(results[0].type).to.equal("series");
			});
		});
	});

	/**
	 * @TODO Translation tests are disabled due to TVDB's API being broken right now
	 *
	 * Translation Information
	 */
	describe("Translations", () => {
		describe.skip("Fetch translations artwork", () => {});
		describe.skip("Fetch translations for an episode", () => {});
		describe.skip("Fetch translations for a movie", () => {});
		describe.skip("Fetch translations for a person", () => {});
		describe.skip("Fetch translations for a season", () => {});
		describe.skip("Fetch translations for a series", () => {});
	});

	/**
	 * Fetch all types
	 */
	describe("Types", () => {
		describe("Artwork types", () => {
			testRecords(() => tvdb.artworkTypes(), [
				"id", "name", "height", "imageFormat", "recordType", "slug", "thumbHeight",
				"thumbWidth", "width"
			]);
		});
		describe("Company types", () => {
			testRecords(() => tvdb.companyTypes(), ["id", "name"]);
		});
		describe("Entity types", () => {
			testRecords(() => tvdb.entityTypes(), ["id", "name", "hasSpecials"]);
		});
		describe("People types", () => {
			testRecords(() => tvdb.personTypes(), ["id", "name"]);
		});
		describe("Source types", () => {
			testRecords(() => tvdb.sourceTypes(), [
				"id", "name", "postfix", "prefix", "slug", "sort"
			]);
		});
	});

	/**
	 * Season Information
	 */
	describe("Seasons", () => {
		const BASE_KEYS = [
			"id", "image", "imageType", "name", "nameTranslations", "network", "number",
			"overviewTranslations", "seriesId", "type"
		];
		describe("Fetch a season record", () => {
			testRecord(() => tvdb.season(16748), [...BASE_KEYS]);
		});
		describe("Fetch an extended season record", () => {
			testRecord(() => tvdb.seasonExtended(16748), [
				...BASE_KEYS, "artwork", "episodes", "trailers"
			],
			(season) => {
				expect(season.episodes).to.not.be.empty;
				util.expectEpisodeToBeParsed(season.episodes[0]);
			});
		});
	});

	/**
	 * Describe all series lookup functionality
	 */
	describe("Series", () => {
		const BASE_KEYS = [
			"aliases", "defaultSeasonType", "firstAired", "id", "image",
			"isOrderRandomized", "lastAired", "name", "nameTranslations", "nextAired",
			"originalCountry", "originalLanguage", "originalNetwork", "overviewTranslations",
			"score", "slug", "status"
		];
		describe("Fetch all series", () => {
			testRecords(() => tvdb.allSeries(), BASE_KEYS, util.expectSeriesToBeParsed,
				test("should have different set of results with different page", async (series) => {
					let results = await tvdb.allSeries(1);
					expect(results[0].name).to.not.equal(series.name);
				})
			);
		});
		describe("Fetch a base series record", () => {
			testRecord(() => tvdb.series(75897), BASE_KEYS, util.expectSeriesToBeParsed);
		});
		describe("Fetch an extended series record", () => {
			testRecord(() => tvdb.seriesExtended(75897), [...BASE_KEYS, "airsDays", "airsTime",
				"airsTimeUTC", "artworks", "characters", "lists", "genres", "networks", "remoteIds",
				"seasons", "trailers"],
				util.expectSeriesToBeParsed
			);
		});
		describe("Fetch episode records from a series", () => {
			let series: Schema.ISeriesBaseRecord;
			let episodes: Schema.IEpisodeBaseRecord[];
			it("should fetch the series and episode records", async () => {
				let result = await tvdb.seriesEpisodes(75897); // South Park
				expect(result).to.not.be.undefined;
				series = result.series;
				episodes = result.episodes;
			});
			it("should have a parsed extended series record", () => {
				expect(series).to.have.all.keys(...BASE_KEYS);
				util.expectSeriesToBeParsed(series);
			});
			it("should have parsed episode records", () => {
				expect(episodes).to.be.an.instanceOf(Array);
				/**
				 * @TODO This currently doesn't work in TVDB's API
				 */
				// expect(episodes).to.not.be.empty;
				// expect(episodes[0]).to.have.all.keys("aired", "id", "image", "imageType", "isMovie",
				//                                      "name", "nameTranslations", "number",
				//                                      "overviewTranslations", "runtime",
				//                                      "seasonNumber", "seasons", "seriesId");
				// expectPossibleDate(episodes[0].aired);
			});
		});
	});
});
