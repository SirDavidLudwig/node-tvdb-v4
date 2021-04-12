import * as Schema from "./schema";

/**
 * Extended artwork record
 */
export interface IArtworkExtendedRecord extends Schema.IArtworkBaseRecord {
	episodeId      : number | null,
	height         : number,             // int64
	movieId        : number | null,
	networkId      : number | null,
	peopleId       : number | null,
	seasonId       : number | null,
	seriesId       : number | null,
	seriesPeopleId : number,
	thumbnailHeight: number,             // int64
	thumbnailWidth : number,             // int64
	updatedAt      : number,             // int64
	width          : number,             // int64
	tagOptions     : Schema.ITagOption,  // @WARN not listed in spec
	status         : {                   // @WARN not listed in the spec
		id  : number,
		name: string | null
	},
}

/**
 * Extended award category record
 */
export interface IAwardCategoryExtendedRecord extends Schema.IAwardCategoryBaseRecord {
	nominees: IAwardNomineeBaseRecord[]
}

/**
 * Base award nominee record
 */
export interface IAwardNomineeBaseRecord {
	character: ICharacter | null,
	details  : string,
	episode  : IEpisodeBaseRecord | null,
	id       : number,                           // int64
	isWinner : boolean,
	movie    : Schema.IMovieBaseRecord | null,
	series   : ISeriesBaseRecord | null,
	year     : string
}

/**
 * Character record
 */
 export interface ICharacter {
	aliases             : Schema.IAlias[],
	episodeId           : number,
	id                  : number,     // int64
	image               : string,
	isFeatured          : boolean,
	movieId             : number,
	name                : string,
	nameTranslations    : string[],
	overviewTranslations: string[],
	peopleId            : number,
	peopleType          : string,
	person              : Schema.IPeopleBaseRecord
	seriesId            : number,
	sort                : number,     // int64
	type                : number,     // int64
	url                 : string
}

/**
 * A company record
 */
export interface ICompany {
	activeDate          : string,
	aliases             : Schema.IAlias[],
	country             : string,
	id                  : number,            // int64
	inactiveDate        : string,
	name                : string,
	nameTranslations    : string[],
	overviewTranslations: string[],
	primaryCompanyType  : number,            // int64
	slug                : string
}

/**
 * Entity update record
 */
export interface IEntityUpdate {
	entityType: string,
	method    : string,
	recordId  : number,   // int64
	timeStamp : number    // int64
}

/**
 * Base episode record
 */
export interface IEpisodeBaseRecord {
	aired               : string,
	id                  : number,                       // int64
	image               : string,
	imageType           : number,
	isMovie             : number,                       // int64
	name                : string,
	nameTranslations    : string[],
	number              : number,
	overviewTranslations: string[],
	runtime             : number,
	seasonNumber        : number,
	seasons             : Schema.ISeasonBaseRecord[],
	seriesId            : number                        // int64
}

/**
 * Extended episode record
 */
export interface IEpisodeExtendedRecord extends IEpisodeBaseRecord {
	airsAfterSeason  : number,
	airsBeforeEpisode: number,
	airsBeforeSeason : number,
	awards           : Schema.IAwardBaseRecord[],
	characters       : ICharacter[],
	contentRatings   : Schema.IContentRating[],
	network         ?: Schema.INetworkBaseRecord,  // @WARN possibly undefined...
	productionCode   : string,
	remoteIds        : Schema.IRemoteID[],
	tagOptions       : Schema.ITagOption[],
	trailers         : Schema.ITrailer[]
}

/**
 * Base list record
 */
 export interface IListBaseRecord {
	aliases             : Schema.IAlias[],
	id                  : number,     // int64
	isOfficial          : boolean,
	name                : string,
	nameTranslations    : string[],
	overview            : string,
	overviewTranslations: string[],
	url                 : string
}

/**
 * Extended movie record
 */
export interface IMovieExtendedRecord extends Schema.IMovieBaseRecord {
	artworks         : Schema.IArtworkBaseRecord[],
	audioLanguages   : string[] | null,
	awards           : Schema.IAwardBaseRecord[] | null,
	boxOffice        : string,
	budget           : string,
	characters       : ICharacter[],
	lists            : Schema.IListBaseRecord[],
	genres           : Schema.IGenreBaseRecord[],
	originalCountry  : string,
	originalLanguage : string | null,
	releases         : IRelease[],
	remoteIds        : Schema.IRemoteID[],
	studios          : Schema.IStudioBaseRecord[],
	subtitleLanguages: string[] | null,
	tagOptions       : Schema.ITagOption | null
	trailers         : Schema.ITrailer[] | null
}

/**
 * Extended people record
 */
export interface IPeopleExtendedRecord extends Schema.IPeopleBaseRecord {
	awards     : Schema.IAwardBaseRecord[],
	biographies: Schema.IBiography[],
	birth      : string,
	birthPlace : string,
	characters : ICharacter[],
	death      : string,
	gender     : number,
	races      : Schema.IRace[],
	remoteIds  : Schema.IRemoteID[],
	tagOptions : Schema.ITagOption[]
}

/**
 * A release record
 */
export interface IRelease {
	country: string,
	date   : string,
	detail : string
}

/**
 * Search result
 */
export interface ISearchResult {
	aliases               ?: string[],  // @WARN Does not seem to exist
	companies             ?: string[],  // @WARN Does not seem to exist
	company_type          ?: string,    // @WARN Does not seem to exist
	country                : string,
	director              ?: string,
	extended_title        ?: string,
	genres                ?: string[],  // @WARN Does not seem to exist
	id                     : string,
	image_url              : string,
	name                   : string,
	name_translated        : string,
	network                : string,
	official_list         ?: string,
	overview               : string,
	overview_translated   ?: string[],
	posters               ?: string[],  // @WARN Does not seem to exist
	primary_language       : string,
	primary_type           : string,
	status                 : string,
	translations_with_lang?: string,    // @WARN Does not seem to exist
	tvdb_id                : string,
	type                   : string,
	year                  ?: string
}

/**
 * Extended season record
 */
export interface ISeasonExtendedRecord extends Schema.ISeasonBaseRecord {
	artwork : Schema.IArtworkBaseRecord[],
	episodes: IEpisodeBaseRecord[],
	trailers: Schema.ITrailer[],
}

/**
 * The base record for a series
 */
 export interface ISeriesBaseRecord {
	abbreviation       ?: string,          // This can be undefined
	aliases             : Schema.IAlias[],
	country            ?: string,          // This can be undefined
	defaultSeasonType   : number,          // int64
	firstAired          : string,
	id                  : number,
	image               : string,
	isOrderRandomized   : boolean,
	lastAired           : string,
	name                : string,
	nameTranslations    : string[],
	nextAired           : string,
	originalCountry     : string,
	originalLanguage    : string,
	originalNetwork     : Schema.INetworkBaseRecord,  // @WARN Not listed in spec
	overviewTranslations: string[],
	score               : number,
	slug                : string,
	status              : Schema.IStatus,
}

/**
 * The extended record for a series
 */
export interface ISeriesExtendedRecord extends ISeriesBaseRecord {
	airsDays   : Schema.ISeriesAirsDays,
	airsTime   : string,
	airsTimeUTC: number | null,                 // @WARN Not listed in spec
	artworks   : Schema.IArtworkBaseRecord[],
	characters : ICharacter[],
	lists      : {},                            // @TODO Check this...
	genres     : Schema.IGenreBaseRecord[],
	networks   : Schema.INetworkBaseRecord[],
	remoteIds  : Schema.IRemoteID[],
	seasons    : Schema.ISeasonBaseRecord[],
	trailers   : Schema.ITrailer[]
}

/**
 * Series episodes
 */
export interface ISeriesEpisodes {
	series  : ISeriesBaseRecord,     // @WARN The spec incorrectly states extended record
	episodes: IEpisodeBaseRecord[]
}
