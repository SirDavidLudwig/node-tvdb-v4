/**
 * An alias model
 */
export interface IAlias {
	language: string,
	name    : string
}

/**
 * Base artwork record
 */
export interface IArtworkBaseRecord {
	id       : number,
	image    : string,
	language : string,
	score    : number,
	thumbnail: string,
	type     : bigint
}

/**
 * Extended artwork record
 */
export interface IArtworkExtendedRecord extends IArtworkBaseRecord {
	episodeId      : number,
	height         : bigint,
	movieId        : number,
	networkId      : number,
	peopleId       : number,
	seasonId       : number,
	seriesId       : number,
	seriesPeopleId : number,
	thumbnailHeight: bigint,
	thumbnailWidth : bigint,
	updatedAt      : bigint,
	width          : bigint
}

/**
 * Artwork status record
 */
export interface IArtworkStatus {
	id  : bigint,
	name: string
}

/**
 * Artwork type record
 */
export interface IArtworkType {
	height     : bigint,
	id         : bigint,
	imageFormat: string,
	name       : string,
	recordType : string,
	slug       : string,
	thumbHeight: bigint,
	thumbWidth : bigint,
	width      : bigint
}

/**
 * Base award record
 */
export interface IAwardBaseRecord {
	id  : number,
	name: string
}

/**
 * Base award category record
 */
export interface IAwardCategoryBaseRecord {
	allowCoNominees: boolean,
	award          : IAwardBaseRecord,
	forMovies      : boolean,
	forSeries      : boolean,
	id             : bigint,
	name           : string
}

/**
 * Extended award category record
 */
export interface IAwardCategoryExtendedRecord extends IAwardCategoryBaseRecord {
	nominees: IAwardNomineeBaseRecord[]
}

/**
 * Extended award record
 */
export interface IAwardExtendedRecord extends IAwardBaseRecord {
	categories: IAwardCategoryBaseRecord[],
	score: bigint
}

/**
 * Base award nominee record
 */
export interface IAwardNomineeBaseRecord {
	character: ICharacter[],
	details  : string,
	episode  : IEpisodeBaseRecord,
	id       : bigint,
	isWinner : boolean,
	movie    : IMovieBaseRecord,
	series   : ISeriesBaseRecord,
	yeaor    : string
}

/**
 * Biography record
 */
export interface IBiography {
	biography: string,
	language : string
}

/**
 * Character record
 */
export interface ICharacter {
	aliases             : IAlias[],
	episodeId           : number,
	id                  : bigint,
	image               : string,
	isFeatured          : boolean,
	movieId             : number,
	name                : string,
	nameTranslations    : string[],
	overviewTranslations: string[],
	peopleId            : number,
	seriesId            : number,
	sort                : bigint,
	type                : bigint,
	url                 : string
}

/**
 * A company record
 */
export interface ICompany {
	activeDate          : string,
	aliases             : IAlias[],
	country             : string,
	id                  : bigint,
	inactiveDate        : string,
	name                : string,
	nameTranslations    : string[],
	overviewTranslations: string[],
	primaryCompanyType  : bigint,
	slug                : string
}

/**
 * A company type record
 */
export interface ICompanyType {
	id  : number,
	name: string
}

/**
 * Content rating record
 */
export interface IContentRating {
	id         : bigint,
	name       : string,
	country    : string,
	contentType: string,
	order      : number,
	fullName   : string
}

/**
 * Country record
 */
export interface ICountry {
	id       : string,
	name     : string,
	shortCode: string
}

/**
 * Entity record
 */
export interface IEntity {
	movieId : number,
	order   : bigint,
	seriesId: number
}

/**
 * Entity type record
 */
export interface IEntityType {
	id      : number,
	name    : string,
	seriesId: number
}

/**
 * Entity update record
 */
export interface IEntityUpdate {
	entityType: string,
	method    : string,
	recordId  : bigint,
	timeStamp : bigint
}

/**
 * Base episode record
 */
export interface IEpisodeBaseRecord {
	aired               : string,
	id                  : bigint,
	image               : string,
	imageType           : number,
	isMovie             : bigint,
	name                : string,
	nameTranslations    : string[],
	number              : number,
	overviewTranslations: string[],
	runtime             : number,
	seasonNumber        : number,
	seasons             : ISeasonBaseRecord[],
	seriesId            : bigint
}

/**
 * Extended episode record
 */
export interface IEpisodeExtendedRecord extends IEpisodeBaseRecord {
	airsAfterSeason  : number,
	airsBeforeEpisode: number,
	airsBeforeSeason : number,
	awards           : IAwardBaseRecord[],
	characters       : ICharacter[],
	contentRatings   : IContentRating[],
	network          : INetworkBaseRecord,
	productionCode   : string,
	remoteIds        : IRemoteID[],
	tagOptions       : ITagOption[],
	trailers         : ITrailer[]
}

/**
 * Gender record
 */
export interface IGender {
	id  : bigint, // That's a lotta genders
	name: string
}

/**
 * Base genre record
 */
export interface IGenreBaseRecord {
	id  : bigint,
	name: string,
	slug: string
}

/**
 * Language record
 */
export interface ILanguage {
	id        : string,
	name      : string,
	nativeName: string,
	shortCode : string
}

/**
 * Base list record
 */
export interface IListBaseRecord {
	aliases             : IAlias[],
	id                  : bigint,
	isOfficial          : boolean,
	name                : string,
	nameTranslations    : string[],
	overview            : string,
	overviewTranslations: string[],
	url                 : string
}

/**
 * Extended list record
 */
export interface IListExtendedRecord extends IListBaseRecord {
	entities: IEntity[],
	score   : bigint
}

/**
 * Base movie record
 */
export interface IMovieBaseRecord {
	aliases             : IAlias[],
	id                  : bigint,
	image               : string,
	name                : string,
	nameTranslations    : string[],
	overviewTranslations: string[],
	score               : number,
	slug                : string,
	status              : IStatus
}

/**
 * Extended movie record
 */
export interface IMovieExtendedRecord extends IMovieBaseRecord {
	artworks         : IArtworkBaseRecord[],
	audioLanguages   : string[],
	awards           : IAwardBaseRecord[],
	boxOffice        : string,
	budget           : string,
	characters       : ICharacter[],
	lists            : IListBaseRecord[],
	genres           : IGenreBaseRecord[],
	originalCountry  : string,
	originalLanguage : string,
	releases         : IRelease[],
	remoteIds        : IRemoteID[],
	studios          : IStudioBaseRecord[],
	subtitleLanguages: string[],
	trailers         : ITrailer[]
}

/**
 * Base network record
 */
export interface INetworkBaseRecord {
	abbreviation: string,
	country     : string,
	id          : number,
	name        : string,
	slug        : string
}

/**
 * Base people record
 */
export interface IPeopleBaseRecord {
	aliases: IAlias[],
	id     : bigint,
	image  : string,
	name   : string,
	score  : bigint
}

/**
 * Extended people record
 */
export interface IPeopleExtendedRecord extends IPeopleBaseRecord {
	awards     : IAwardBaseRecord[],
	biographies: IBiography[],
	birth      : string,
	birthPlace : string,
	characters : ICharacter[],
	death      : string,
	gender     : number,
	races      : IRace[],
	remoteIds  : IRemoteID[],
	tagOptions : ITagOption[]
}

/**
 * People type record
 */
export interface IPeopleType {
	id  : bigint,
	name: string
}

/**
 * Race record
 */
export interface IRace
{} // Um... ok??

export interface IRelease {
	country: string,
	date   : string,
	detail : string
}

/**
 * Remote ID record
 */
export interface IRemoteID {
	id  : string,
	type: bigint
}

/**
 * Search result
 */
export interface ISearchResult {
	aliases             : string[],
	companies           : string[],
	companyType         : string,
	country             : string,
	director            : string,
	extendedTitle       : string,
	genres              : string[],
	id                  : string,
	imageUrl            : string,
	name                : string,
	nameTranslated      : string,
	network             : string,
	officialList        : string,
	overview            : string,
	overview_translated : string[], // NASTY
	posters             : string[],
	primaryLanguage     : string,
	primaryType         : string,
	status              : string,
	translationsWithLang: string,
	tvdb_id             : string,
	type                : string,
	year                : string
}

/**
 * A base season record
 */
export interface ISeasonBaseRecord {
	abbreviation        : string,
	country             : string,
	id                  : number,
	image               : string,
	imageType           : number,
	name                : string,
	nameTranslations    : string[],
	number              : bigint,
	overviewTranslations: string[],
	seriesId            : bigint,
	slug                : string,
	type                : bigint
}

/**
 * Extended season record
 */
export interface ISeasonExtendedRecord extends ISeasonBaseRecord {
	artwork : IArtworkBaseRecord[],
	episodes: IEpisodeBaseRecord[],
	trailers: ITrailer[]
}

/**
 * Season type record
 */
export interface ISeasonType {
	id  : bigint,
	name: string,
	type: bigint
}

/**
 * A series airs day record
 */
export interface ISeriesAirsDays {
	friday   : boolean,
	monday   : boolean,
	saturday : boolean,
	sunday   : boolean,
	thursday : boolean,
	tuesday  : boolean,
	wednesday: boolean
}

/**
 * The base record for a series
 */
 export interface ISeriesBaseRecord {
	abbreviation        : string,
	aliases             : IAlias[],
	country             : string,
	defaultSeasonType   : bigint,
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
	overviewTranslations: string[],
	score               : number,
	slug                : string,
	status              : IStatus,
}

/**
 * The extended record for a series
 */
export interface ISeriesExtendedRecord extends ISeriesBaseRecord {
	airsDays  : ISeriesAirsDays,
	airsTime  : string,
	artworks  : IArtworkBaseRecord[],
	characters: ICharacter[],
	lists     : {},                    // @TODO Check this...
	genres    : IGenreBaseRecord[],
	networks  : INetworkBaseRecord[],
	remoteIds : IRemoteID[],
	seasons   : ISeasonBaseRecord[],
	trailers  : ITrailer[]
}

/**
 * Source type record
 */
export interface ISourceType {
	id     : bigint,
	name   : string,
	postfix: string,
	prefix : string,
	slug   : string,
	sort   : bigint
}

/**
 * Status record
 */
export interface IStatus {
	id         : bigint,
	keepUpdated: boolean,
	name       : string,
	recordType : string
}

/**
 * Studio record
 */
export interface IStudioBaseRecord {
	id          : bigint,
	name        : string,
	parentStudio: number
}

/**
 * Tag record
 */
export interface ITag {
	allowsMultiple: boolean,
	helpText      : string,
	id            : bigint,
	name          : string,
	options       : ITagOption[]
}

/**
 * Tag option record
 */
export interface ITagOption {
	helpText: string,
	id      : bigint,   // (int64) x-go-name: ID
	name    : string    // x-go-name: Name
	tag     : bigint    // (int64) x-go-name: Tag
	tagName : string    // x-go-name: TagName
}

/**
 * An entity with selected tag option
 */
 export interface ITagOptionEntity {
	name   : string,
	tagId  : number,
	tagName: string
}

/**
 * Trailer record
 */
export interface ITrailer {
	id      : bigint,   // (int64) x-go-name: ID
	language: string,
	name    : string,
	url     : string
}

/**
 * Translation record
 */
export interface ITranslation {
	aliases  : string[],
	isAlias  : boolean,
	isPrimary: boolean,
	language : string,     // x-go-language: Language
	name     : string,
	overview : string
}
