import * as Raw from "./schema_raw";

/**
 * Modify raw schema definition to contain parsed attributes
 */
type Modify<T, R> = Omit<T, keyof R> & R;

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
	image    : string | null,
	language : string,
	score    : number,
	thumbnail: string,
	type     : number   // int64
}

/**
 * Extended artwork record
 */
export type IArtworkExtendedRecord = Modify<Raw.IArtworkExtendedRecord, {
	updatedAt: Date
}>;

/**
 * Artwork status record
 */
export interface IArtworkStatus {
	id  : number,   // int64
	name: string
}

/**
 * Artwork type record
 */
export interface IArtworkType {
	height     : number,   // int64
	id         : number,   // int64
	imageFormat: string,
	name       : string,
	recordType : string,
	slug       : string,
	thumbHeight: number,   // int64
	thumbWidth : number,   // int64
	width      : number    // int64
}

/**
 * Base award record
 */
export interface IAwardBaseRecord {
	id  : number,
	name: string
}

/**
 * Extended award record
 */
export interface IAwardExtendedRecord extends IAwardBaseRecord {
	categories: IAwardCategoryBaseRecord[],
	score     : number                       // int64
}

/**
 * Base award category record
 */
export interface IAwardCategoryBaseRecord {
	allowCoNominees: boolean,
	award          : IAwardBaseRecord,
	forMovies      : boolean,
	forSeries      : boolean,
	id             : number,             // int64
	name           : string
}

/**
 * Extended award category record
 */
export type IAwardCategoryExtendedRecord = Modify<Raw.IAwardCategoryExtendedRecord, {
	nominees: IAwardNomineeBaseRecord[]
}>;

/**
 * Base award nominee record
 */
export type IAwardNomineeBaseRecord = Modify<Raw.IAwardNomineeBaseRecord, {
	character: ICharacter         | null,
	episode  : IEpisodeBaseRecord | null,
	movie    : IMovieBaseRecord   | null,
	series   : ISeriesBaseRecord  | null,
	year     : number | null
}>;

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
export type ICharacter  = Modify<Raw.ICharacter, {
	image    : string | null,
	episodeId: number | null,
	movieId  : number | null,
	seriesId : number | null,
	url      : string | null
}>;

/**
 * A company record
 */
export type ICompany = Modify<Raw.ICompany, {
	activeDate  : Date | null,
	inactiveDate: Date | null
}>;

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
	id         : number,   // int64
	name       : string,
	country    : string,
	contentType: string,
	description: string,   // @WARN not listed in spec
	order      : number,
	fullname   : string    // @WARN Spec has mislabeled 'fullName'
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
	order   : number,   // int64
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
export type IEntityUpdate = Modify<Raw.IEntityUpdate, {
	timeStamp: Date
}>;

/**
 * Base episode record
 */
export type IEpisodeBaseRecord = Modify<Raw.IEpisodeBaseRecord, {
	aired: Date | null
}>;

/**
 * Extended episode record
 */
export type IEpisodeExtendedRecord = Modify<Modify<Raw.IEpisodeExtendedRecord, IEpisodeBaseRecord>, {
	characters: ICharacter[]
}>;

/**
 * Gender record
 */
export interface IGender {
	id  : number,   // int64   // That's a lotta genders
	name: string
}

/**
 * Base genre record
 */
export interface IGenreBaseRecord {
	id  : number,   // int64
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
export type IListBaseRecord = Modify<Raw.IListBaseRecord, {
	url: string | null
}>;

/**
 * Extended list record
 */
export interface IListExtendedRecord extends IListBaseRecord {
	entities: IEntity[],
	score   : number      // int64
}

/**
 * Base movie record
 */
 export interface IMovieBaseRecord {
	aliases             : IAlias[],
	id                  : number,          // int64
	image               : string | null,
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
export type IMovieExtendedRecord = Modify<Raw.IMovieExtendedRecord, {
	characters: ICharacter[],
	releases  : IRelease[]
}>

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
	aliases             : IAlias[],
	id                  : number,          // int64
	image               : string | null,
	name                : string,
	score               : number,          // int64
	nameTranslations    : string[],
	overviewTranslations: string[]
}

/**
 * Extended people record
 */
export type IPeopleExtendedRecord = Modify<Raw.IPeopleExtendedRecord, {
	birth     : Date | null,
	death     : Date | null,
	characters: ICharacter[]
}>;

/**
 * People type record
 */
export interface IPeopleType {
	id  : number,   // int64
	name: string
}

/**
 * Race record
 */
export interface IRace
{} // Um... ok??

/**
 * Release record
 */
export type IRelease = Modify<Raw.IRelease, {
	date: Date
}>;

/**
 * Remote ID record
 */
export interface IRemoteID {
	id  : string,
	type: number   // int64
}

/**
 * Search result
 */
export type ISearchResult = Modify<Raw.ISearchResult, {
	country          : string | null,
	image_url        : string | null,
	name_translated  : string | null,
	network          : string | null,
	overview         : string | null,
	primary_language : string | null,
	primary_type     : string | null,
	status           : string | null,
	tvdb_id          : number,
	year             : number | null
}>;

/**
 * A base season record
 */
 export interface ISeasonBaseRecord {
	abbreviation       ?: string,          // @WARN this may be undefined
	country            ?: string,          // @WARN this may be undefined
	id                  : number,
	image               : string | null,
	imageType           : number | null,   // @WARN This attribute should be looked into...
	name                : string,
	nameTranslations    : string[],
	network             : INetworkBaseRecord,
	number              : number,          // int64
	overviewTranslations: string[],
	seriesId            : number,          // int64
	slug               ?: string,          // @WARN possibly undefined with extended record
	type                : number           // int64
}

/**
 * Extended season record
 */
export type ISeasonExtendedRecord = Modify<Raw.ISeasonExtendedRecord, {
	episodes: IEpisodeBaseRecord[]
}>;

/**
 * Season type record
 */
export interface ISeasonType {
	id  : number,   // int64
	name: string,
	type: number    // int64
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

export type ISeriesBaseRecord = Modify<Raw.ISeriesBaseRecord, {
	firstAired: Date | null,
	lastAired : Date | null,
	nextAired : Date | null,
}>;

/**
 * The extended record for a series
 */
export type ISeriesExtendedRecord = Modify<Modify<Raw.ISeriesExtendedRecord, ISeriesBaseRecord>, {
	characters: ICharacter[]
}>;

/**
 * Series episodes
 */
export type ISeriesEpisodes = Modify<Raw.ISeriesEpisodes, {
	series  : ISeriesBaseRecord,
	episodes: IEpisodeBaseRecord[]
}>;

/**
 * Source type record
 */
export interface ISourceType {
	id     : number,   // int64
	name   : string,
	postfix: string,
	prefix : string,
	slug   : string,
	sort   : number    // int64
}

/**
 * Status record
 */
export interface IStatus {
	id         : number,    // int64
	keepUpdated: boolean,
	name       : string,
	recordType : string
}

/**
 * Studio record
 */
export interface IStudioBaseRecord {
	id          : number,   // int64
	name        : string,
	parentStudio: number
}

/**
 * Tag record
 */
export interface ITag {
	allowsMultiple: boolean,
	helpText      : string,
	id            : number,       // int64
	name          : string,
	options       : ITagOption[]
}

/**
 * Tag option record
 */
export interface ITagOption {
	helpText: string,
	id      : number,   // int64
	name    : string,
	tag     : number,   // int64
	tagName : string
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
	id      : number,   // int64
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
	language : string,
	name     : string,
	overview : string
}
