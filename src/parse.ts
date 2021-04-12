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
		return <Schema.IAwardCategoryExtendedRecord><unknown>Object.assign(category, {
			nominees: category.nominees.map(parse.awardNominee)
		});
	},

	/**
	 * Mutate a raw award nominee schema into a parsed schema
	 */
	 awardNominee(nominee: Raw.IAwardNomineeBaseRecord) {
		return <Schema.IAwardNomineeBaseRecord>Object.assign(nominee, {
			character: nominee.character ? parse.character(nominee.character)      : null,
			episode  : nominee.episode   ? parse.episodeBaseRecord(nominee.episode): null,
			movie    : nominee.movie     ? nominee.movie                           : null,
			series   : nominee.series    ? parse.seriesBaseRecord(nominee.series)  : null,
			year     : nominee.year      ? parseInt(nominee.year)                  : null
		});
	},

	/**
	 * Mutate a raw character schema into a parsed schema
	 */
	character(character: Raw.ICharacter) {
		return <Schema.ICharacter>Object.assign(character, {
			episodeId: character.episodeId ? character.episodeId: null,
			movieId  : character.movieId   ? character.movieId  : null,
			seriesId : character.seriesId  ? character.seriesId : null,
			image    : character.image || null,
			url      : character.url   || null
		});
	},

	/**
	 * Mutate a raw company schema into a parsed schema
	 */
	company(company: Raw.ICompany) {
		return <Schema.ICompany>Object.assign(company, {
			activeDate  : parse.date(company.activeDate),
			inactiveDate: parse.date(company.inactiveDate),
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
	episodeBaseRecord(episode: Raw.IEpisodeBaseRecord) {
		return <Schema.IEpisodeBaseRecord>Object.assign(episode, {
			aired: parse.date(episode.aired),
		});
	},

	/**
	 * Mutate a raw extended episode schema into a parsed schema
	 */
	episodeExtendedRecord(episode: Raw.IEpisodeExtendedRecord) {
		return <Schema.IEpisodeExtendedRecord>Object.assign(parse.episodeBaseRecord(episode), {
			characters: episode.characters.map(parse.character)
		});
	},

	/**
	 * Mutate a raw list schema into a parsed schema
	 */
	listRecord(list: Raw.IListBaseRecord) {
		return <Schema.IListBaseRecord>Object.assign(list, {
			url: list.url || null
		});
	},

	/**
	 * Mutate a raw extended movie schema into a parsed schemo
	 */
	movieRecord(movie: Raw.IMovieExtendedRecord) {
		return <Schema.IMovieExtendedRecord>Object.assign(movie, {
			characters: movie.characters.map(parse.character),
			releases  : movie.releases.map(parse.release)
		});
	},

	/**
	 * Parse a raw extended people schema into a parsed schema
	 */
	peopleRecord(person: Raw.IPeopleExtendedRecord) {
		return <Schema.IPeopleExtendedRecord>Object.assign(person, {
			birth: parse.date(person.birth),
			death: parse.date(person.death),
			characters: person.characters.map(parse.character)
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

	/**
	 * Mutate a raw search result schema into a parsed schema
	 */
	searchResult(result: Raw.ISearchResult) {
		return <Schema.ISearchResult>Object.assign(result, {
			country         : result.country || null,
			image_url       : result.image_url || null,
			name_translated : result.name_translated || null,
			network         : result.network || null,
			overview        : result.overview || null,
			primary_language: result.primary_language || null,
			primary_type    : result.primary_type || null,
			status          : result.status || null,
			tvdb_id         : parseInt(result.tvdb_id),
			year            : result.year ? parseInt(result.year): null
		})
	},

	/**
	 * Mutate a raw extended season schema into a parsed schema
	 */
	seasonRecord(season: Raw.ISeasonExtendedRecord) {
		return <Schema.ISeasonExtendedRecord>Object.assign(season, {
			episodes: season.episodes.map(parse.episodeBaseRecord)
		});
	},

	/**
	 * Mutate a raw series schema into a parsed schema
	 */
	seriesBaseRecord(series: Raw.ISeriesBaseRecord) {
		return <Schema.ISeriesBaseRecord>Object.assign(series, {
			firstAired: parse.date(series.firstAired),
			lastAired : parse.date(series.lastAired),
			nextAired : parse.date(series.nextAired)
		});
	},

	/**
	 * Mutate a raw extended series schema into a parsed schema
	 */
	seriesExtendedRecord(series: Raw.ISeriesExtendedRecord) {
		return <Schema.ISeriesExtendedRecord>Object.assign(parse.seriesBaseRecord(series), {
			characters: series.characters.map(parse.character)
		});
	}
}

export default parse;
