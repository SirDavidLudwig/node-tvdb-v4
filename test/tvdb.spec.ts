import { config } from "dotenv";
import chaiAsPromised from "chai-as-promised";
import { expect, use, should } from "chai";
import "mocha";
import { writeFileSync } from "fs";

/**
 * Load the environment configuration
 */
config();

/**
 * Use the chai-as-promised plugin
 */
use(chaiAsPromised);
use(should);

// -------------------------------------------------------------------------------------------------

import TVDB, { StatusError } from "../src/";
import * as Schema from "../src/schema";

describe("TVDB", () => {

	// Create a new instance of TVDB
	let tvdb = new TVDB(<string>process.env["API_KEY"]);

	describe("Status Error", () => {
		let error = new StatusError(undefined, 200);
		it("should have status code of 200", () => {
			expect(error.statusCode).to.equal(200);
		});
	});

	/**
	 * Describe the login functionality
	 */
	describe("Login", () => {
		it("should properly reject bad API key", async () => {
			return tvdb.login().should.eventually.be.rejectedWith(StatusError);
		});
		it("should properly reject with valid API key and invalid PIN", () => {
			return tvdb.login().should.eventually.be.rejectedWith(StatusError);
		});
		it("should login successfully with valid API key and PIN", () => {
			return tvdb.login(<string>process.env["PIN"]).should.be.fulfilled;
		});
	});

	/**
	 * Fetch all statuses
	 */
	describe("Statuses", () => {
		describe("Artwork statuses", () => {
			let statuses: Schema.IArtworkStatus[];
			it("Fetch all statuses", async() => {
				statuses = await tvdb.artworkStatuses();
				expect(statuses).to.be.an.instanceOf(Array);
			});
			it("should not be empty", () => {
				expect(statuses).to.not.be.empty;
			});
			it("should have valid properties", () => {
				expect(statuses[0]).to.have.all.keys("id", "name");
			});
		});
		describe("Movie statuses", () => {
			let statuses: Schema.IStatus[];
			it("should fetch statuses", async() => {
				statuses = await tvdb.movieStatuses();
				expect(statuses).to.be.an.instanceOf(Array);
			});
			it("should not be empty", () => {
				expect(statuses).to.not.be.empty;
			});
			it("should have valid properties", () => {
				expect(statuses[0]).to.have.all.keys("id", "name", "recordType", "keepUpdated");
			});
		});
		describe("Series statuses", () => {
			let statuses: Schema.IStatus[];
			it("should fetch statuses", async() => {
				statuses = await tvdb.seriesStatuses();
				expect(statuses).to.be.an.instanceOf(Array);
			});
			it("should not be empty", () => {
				expect(statuses).to.not.be.empty;
			});
			it("should have valid properties", () => {
				expect(statuses[0]).to.have.all.keys("id", "name", "recordType", "keepUpdated");
			});
		});
	});

	/**
	 * Fetch all types
	 */
	describe("Types", () => {
		describe("Artwork types", () => {
			let types: Schema.IArtworkType[];
			it("should fetch types", async() => {
				types = await tvdb.artworkTypes();
				expect(types).to.be.an.instanceOf(Array);
			});
			it("should not be empty", () => {
				expect(types).to.not.be.empty;
			});
			it("should have valid properties", () => {
				expect(types[0]).to.have.all.keys(
					"id", "name", "height", "imageFormat", "recordType", "slug",
					"thumbHeight", "thumbWidth", "width");
			});
		});
		describe("Company types", () => {
			let types: Schema.ICompanyType[];
			it("should fetch types", async() => {
				types = await tvdb.companyTypes();
				expect(types).to.be.an.instanceOf(Array);
			});
			it("should not be empty", () => {
				expect(types).to.not.be.empty;
			});
			it("should have valid properties", () => {
				expect(types[0]).to.have.all.keys("id", "name");
			});
		});
		describe("Company types", () => {
			let types: Schema.ICompanyType[];
			it("should fetch types", async() => {
				types = await tvdb.companyTypes();
				expect(types).to.be.an.instanceOf(Array);
			});
			it("should not be empty", () => {
				expect(types).to.not.be.empty;
			});
			it("should have valid properties", () => {
				expect(types[0]).to.have.all.keys("id", "name");
			});
		});
		describe("Entity types", () => {
			let types: Schema.IEntityType[];
			it("should fetch types", async() => {
				types = await tvdb.entityTypes();
				expect(types).to.be.an.instanceOf(Array);
			});
			it("should not be empty", () => {
				expect(types).to.not.be.empty;
			});
			it("should have valid properties", () => {
				expect(types[0]).to.have.all.keys("id", "name", "hasSpecials");
			});
		});
		describe("People types", () => {
			let types: Schema.IPeopleType[];
			it("should fetch types", async() => {
				types = await tvdb.personTypes();
				expect(types).to.be.an.instanceOf(Array);
			});
			it("should not be empty", () => {
				expect(types).to.not.be.empty;
			});
			it("should have valid properties", () => {
				expect(types[0]).to.have.all.keys("id", "name");
			});
		});
		describe("Source types", () => {
			let types: Schema.ISourceType[];
			it("should fetch types", async() => {
				types = await tvdb.sourceTypes();
				expect(types).to.be.an.instanceOf(Array);
			});
			it("should not be empty", () => {
				expect(types).to.not.be.empty;
			});
			it("should have valid properties", () => {
				expect(types[0]).to.have.all.keys("id", "name", "postfix", "prefix", "slug", "sort");
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
		describe("Fetch a base series record", () => {
			let series: Schema.ISeriesBaseRecord;
			it("should fetch a record", async () => {
				series = await tvdb.series(75897) // South Park
				expect(series).to.not.be.undefined;
			});
			it("should have required properties", () => {
				expect(series).to.have.all.keys(...BASE_KEYS);
			});
			it("should have parsed properties", () => {
				expect(series.firstAired).to.satisfy((d: any) => d instanceof Date || d === null);
				expect(series.lastAired).to.satisfy((d: any) => d instanceof Date || d === null);
				expect(series.nextAired).to.satisfy((d: any) => d instanceof Date || d === null);
			});
		});
		describe("Fetch an extended series record", () => {
			let series: Schema.ISeriesExtendedRecord;
			it("should fetch a record", async () => {
				series = await tvdb.seriesExtended(75897) // South Park
				expect(series).to.not.be.undefined;
			});
			it("should have required properties", () => {
				expect(series).to.have.all.keys(...BASE_KEYS, "airsDays", "airsTime", "airsTimeUTC",
				                                "artworks", "characters", "lists", "genres",
				                                "networks", "remoteIds", "seasons", "trailers");
			});
			it("should have parsed properties", () => {
				expect(series.firstAired).to.satisfy((d: any) => d instanceof Date || d === null);
				expect(series.lastAired).to.satisfy((d: any) => d instanceof Date || d === null);
				expect(series.nextAired).to.satisfy((d: any) => d instanceof Date || d === null);
			});
		});
		describe("Fetch episode records from a season", () => {
			let series: Schema.ISeriesBaseRecord;
			let episodes: Schema.IEpisodeBaseRecord[];
			it("should fetch the series and episode records", async () => {
				let result = await tvdb.seriesEpisodes(81189); // South Park
				console.log(result);

				expect(result).to.not.be.undefined;
				series = result.series;
				episodes = result.episodes;
			});
			it("should have a parsed extended series record", () => {
				expect(series).to.have.all.keys(...BASE_KEYS);
				expect(series.firstAired).to.satisfy((d: any) => d instanceof Date || d === null);
				expect(series.lastAired).to.satisfy((d: any) => d instanceof Date || d === null);
				expect(series.nextAired).to.satisfy((d: any) => d instanceof Date || d === null);
			});
			it("should have parsed episode records", () => {
				expect(episodes).to.be.an.instanceOf(Array);
				expect(episodes).to.not.be.empty;
				expect(episodes[0]).to.have.all.keys("aired", "id", "image", "imageType", "isMovie",
				                                     "name", "nameTranslations", "number",
				                                     "overviewTranslations", "runtime",
				                                     "seasonNumber", "seasons", "seriesId");
				expect(episodes[0].aired).to.satisfy((d: any) => d instanceof Date || d === null);
			});
		});
	});
});
