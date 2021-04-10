import * as Schema from "./schema";
import * as Raw from "./schema_raw";

/**
 * A set of parsing functions to convert data types in responses
 */
const parse = {

	/**
	 * Mutate a raw extended artwork schema into a parsed schema
	 */
	artwork(artwork: Raw.IArtworkExtendedRecord) {
		return <Schema.IArtworkExtendedRecord> Object.assign(artwork, {
			updatedAt: new Date(artwork.updatedAt * 1000)
		});
	},

	/**
	 * Mutate a raw extended award category schema into a parsed schema
	 */
	awardCategory(category: Raw.IAwardCategoryExtendedRecord) {
		return <Schema.IAwardCategoryExtendedRecord>Object.assign(category, {
			nominees: category.nominees.map(parse.nominee)
		});
	},

	/**
	 * Mutate a raw company schema into a parsed schemo
	 */
	company(company: Raw.ICompany) {
		return <Schema.ICompany>Object.assign(company, {
			activeDate  : parse.date(company.activeDate),
			inactiveDate: parse.date(company.inactiveDate)
		});
	},

	/**
	 * Parse a date and return a date object if valid, otherwise null
	 *
	 * @param dateString example: 1997-08-13
	 */
	date(dateString?: string) {
		if (dateString && dateString.length > 0) {
			return new Date(dateString);
		}
		return null;
	},

	/**
	 * Mutate a raw entity update schema into a parsed schema
	 */
	entityUpdate(entity: Raw.IEntityUpdate) {
		return <Schema.IEntityUpdate>Object.assign(entity, {
			timeStamp: new Date(entity.timeStamp * 1000)
		});
	},

	/**
	 * Mutate a raw episode schema into a parsed schema
	 */
	episodeRecord<T extends Schema.IEpisodeBaseRecord>(episode: Raw.IEpisodeBaseRecord) {
		return <T><unknown>Object.assign(episode, {
			aired: parse.date(episode.aired)
		});
	},

	/**
	 * Mutate a raw extended movie schema into a parsed schemo
	 */
	movieRecord(movie: Raw.IMovieExtendedRecord) {
		return <Schema.IMovieExtendedRecord>Object.assign(movie, {
			releases: movie.releases.map(parse.release)
		});
	},

	/**
	 * Mutate a raw award nominee schema into a parsed schema
	 */
	nominee(nominee: Raw.IAwardNomineeBaseRecord) {
		return <Schema.IAwardNomineeBaseRecord>Object.assign(nominee, {
			episode: nominee.episode ? parse.episodeRecord(nominee.episode): null,
			movie  : nominee.movie   ? nominee.movie                       : null,
			series : nominee.series  ? parse.seriesRecord(nominee.series)  : null,
			year   : nominee.year    ? parseInt(nominee.year)              : null
		});
	},

	/**
	 * Parse a raw extended people schema into a parsed schema
	 */
	peopleRecord(person: Raw.IPeopleExtendedRecord) {
		return <Schema.IPeopleExtendedRecord>Object.assign(person, {
			birth: parse.date(person.birth),
			death: parse.date(person.death),
		});
	},

	/**
	 * Parse a raw release schema into a parsed schema
	 */
	release(release: Raw.IRelease) {
		return <Schema.IRelease>Object.assign(release, {
			date: parse.date(release.date)
		});
	},

	searchResult(result: Raw.ISearchResult) {
		return <Schema.ISearchResult> {
			country         : result.country || null,
			extended_title  : result.extended_title || null,
			image_url       : result.image_url || null,
			network         : result.network || null,
			overview        : result.overview || null,
			primary_language: result.primary_language || null,
			primary_type    : result.primary_type || null,
			status          : result.status || null,
			tvdb_id         : parseInt(result.tvdb_id),
			year            : result.year ? parseInt(result.year): null
		}
	},

	/**
	 * Mutate a raw extended season schema into a parsed schema
	 */
	seasonRecord(season: Raw.ISeasonExtendedRecord) {
		return <Schema.ISeasonExtendedRecord>Object.assign(season, {
			episodes: season.episodes.map(parse.episodeRecord)
		});
	},

	/**
	 * Mutate a raw series schema into a parsed schema
	 */
	seriesRecord<T extends Schema.ISeriesBaseRecord>(series: Raw.ISeriesBaseRecord) {
		return <T><unknown>Object.assign(series, {
			firstAired: parse.date(series.firstAired),
			lastAired : parse.date(series.lastAired),
			nextAired : parse.date(series.nextAired)
		});
	}
}

export default parse;
