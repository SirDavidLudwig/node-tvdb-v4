import ApiRequestManager from "./request";
import * as Schema from "./schema";
import * as Raw from "./schema_raw";
import parse from "./parse";

export default class TVDB
{
	/**
	 * The API key for The TVDB
	 */
	private __apiKey: string;

	/**
	 * The last-used pin for logging in
	 */
	private __pin?: string;

	/**
	 * The active authentiaction token
	 */
	private __token?: string;

	/**
	 * Enable auto-relogin if a request comes up unauthorized
	 */
	protected autoRelogin: boolean

	/**
	 * Store the API request manager
	 */
	protected requestManager: ApiRequestManager;

	/**
	 * Create a new API instance of The TVDB
	 *
	 * @param apiKey The API key for The TVDB
	 */
	public constructor(apiKey: string, autoRelogin: boolean = true) {
		this.__apiKey = apiKey;
		this.autoRelogin = autoRelogin;
		this.requestManager = new ApiRequestManager();
	}

	/**
	 * Login to the TVDB and obtain a new token
	 */
	public async login(pin?: string) {
		this.__pin = pin;
		let body = <any>{
			apikey: this.__apiKey
		};
		if (pin) {
			body["pin"] = this.__pin;
		}
		let response = await this.requestManager.post<any>("/login", undefined, undefined, body);
		this.__token = response.token;
	}

	// Artwork Information -------------------------------------------------------------------------

	/**
	 * Retrieve all available artwork statuses
	 */
	public async artworkStatuses() {
		return await this.requestManager.get<Schema.IArtworkStatus[]>(`/artwork/statuses`, this.__token);
	}

	/**
	 * Retrieve all available artwork types
	 */
	public async artworkTypes() {
		return await this.requestManager.get<Schema.IArtworkType[]>(`/artwork/types`, this.__token);
	}

	/**
	 * Retrieve a specific artwork record
	 *
	 * @param id
	 */
	public async artwork(id: number) {
		return await this.requestManager.get<Schema.IArtworkBaseRecord>(`/artwork/${id}`, this.__token);
	}

	/**
	 * Retrieve a specific extended artwork record
	 *
	 * @param id
	 */
	public async artworkExtended(id: number) {
		let res = await this.requestManager.get<Raw.IArtworkExtendedRecord>(`/artwork/${id}/extended`, this.__token);
		return parse.artwork(res);
	}

	/**
	 * Retrieve translations for a specific artwork
	 *
	 * @param id
	 * @param language
	 */
	public async artworkTranslations(id: number, language: string) {
		return await this.requestManager.get<Schema.ITranslation>(`/artwork/${id}/translations/${language}`, this.__token);
	}

	// Award Information ---------------------------------------------------------------------------

	/**
	 * Retrieve a specific award category record
	 *
	 * @param id
	 */
	public async awardCategory(id: number) {
		return await this.requestManager.get<Schema.IAwardCategoryBaseRecord>(`/awards/categories/${id}`, this.__token);
	}

	/**
	 * Retrieve a specific extended award category record
	 *
	 * @param id
	 */
	public async awardCategoryExtended(id: number) {
		let res = await this.requestManager.get<Raw.IAwardCategoryExtendedRecord>(`/awards/categories/${id}/extended`, this.__token);
		return parse.awardCategory(res);
	}

	/**
	 * Retrieve all award records
	 *
	 * @param page
	 */
	public async allAwards() {
		return await this.requestManager.get<Schema.IAwardBaseRecord[]>(`/awards/`, this.__token);
	}

	/**
	 * Retrieve a specific award record
	 *
	 * @param id
	 */
	public async award(id: number) {
		return await this.requestManager.get<Schema.IAwardBaseRecord>(`/awards/${id}`, this.__token);
	}

	/**
	 * Retrieve a specific extended award record
	 *
	 * @param id
	 */
	public async awardExtended(id: number) {
		return await this.requestManager.get<Schema.IAwardExtendedRecord>(`/awards/${id}/extended`, this.__token);
	}

	// Character Information -----------------------------------------------------------------------

	/**
	 * Retrieve a character record
	 *
	 * @param id
	 */
	public async character(id: number) {
		return await this.requestManager.get<Schema.ICharacter>(`/characters/${id}`, this.__token);
	}

	// Company Information -------------------------------------------------------------------------

	/**
	 * Retrieve all company records
	 *
	 * @param page
	 */
	public async allCompanies(page: number = 0) {
		let res = await this.requestManager.get<Raw.ICompany[]>(`/companies`, this.__token, {
			page
		});
		return res.map(parse.company);
	}

	/**
	 * Retrieve all company types
	 */
	public async companyTypes() {
		return await this.requestManager.get<Schema.ICompanyType[]>(`/companies/types`, this.__token);
	}

	/**
	 * Retrieve a specific company record
	 *
	 * @param id
	 */
	public async company(id: number) {
		let res = await this.requestManager.get<Raw.ICompany>(`/companies/${id}`, this.__token);
		return parse.company(res);
	}

	// General Information -------------------------------------------------------------------------

	/**
	 * Retrieve all available content ratings
	 */
	public async contentRatings() {
		return await this.requestManager.get<Schema.IContentRating[]>(`/content/ratings`, this.__token);
	}

	/**
	 * Retrieve all available countries
	 */
	public async countries() {
		return await this.requestManager.get<Schema.ICountry[]>(`/countries`, this.__token);
	}

	/**
	 * Retrieve all available entity types
	 */
	public async entityTypes() {
		return await this.requestManager.get<Schema.IEntityType[]>(`/entities/types`, this.__token);
	}

	/**
	 * Retrieve all available genders
	 */
	public async genders() {
		return await this.requestManager.get<Schema.IGender[]>(`/genders`, this.__token);
	}

	/**
	 * Retrieve all available languages
	 */
	public async languages() {
		return await this.requestManager.get<Schema.ILanguage[]>(`/languages`, this.__token);
	}

	/**
	 * Retrieve all available source types
	 */
	public async sourceTypes() {
		return await this.requestManager.get<Schema.ISourceType[]>(`/sources/types`, this.__token);
	}

	// Episode Information -------------------------------------------------------------------------

	/**
	 * Retrieve a specific episode record
	 *
	 * @param id
	 */
	public async episode(id: number) {
		let res = await this.requestManager.get<Raw.IEpisodeBaseRecord>(`/episodes/${id}`, this.__token);
		return parse.episodeRecord(res);
	}

	/**
	 * Retrieve a specific extended episode record
	 *
	 * @param id
	 */
	public async episodeExtended(id: number) {
		let res = await this.requestManager.get<Raw.IEpisodeExtendedRecord>(`/episodes/${id}/extended`, this.__token);
		return parse.episodeRecord<Schema.IEpisodeExtendedRecord>(res);
	}

	/**
	 * Retrieve translations for a specific episode
	 *
	 * @param id
	 * @param language
	 */
	public async episodeTranslations(id: number, language: string) {
		return await this.requestManager.get<Schema.ITranslation>(`/episodes/${id}/translations/${language}`, this.__token);
	}

	// Genre Information ---------------------------------------------------------------------------

	/**
	 * Retrieve all available genres
	 */
	public async allGenres() {
		return await this.requestManager.get<Schema.IGenreBaseRecord[]>(`/genres`, this.__token);
	}

	/**
	 * Retrieve a specific genre record
	 *
	 * @param id
	 */
	public async genre(id: number) {
		return await this.requestManager.get<Schema.IGenreBaseRecord>(`/genres/${id}`, this.__token);
	}

	// List Information ----------------------------------------------------------------------------

	/**
	 * Retrieve all available lists
	 *
	 * @param page
	 */
	public async allLists(page: number = 0) {
		return await this.requestManager.get<Schema.IListBaseRecord[]>(`/lists`, this.__token, {
			page
		});
	}

	/**
	 * Retrieve a specific list record
	 *
	 * @param id
	 */
	public async list(id: number) {
		return await this.requestManager.get<Schema.IListBaseRecord>(`/lists/${id}`, this.__token);
	}

	/**
	 * Retrieve a specific extended list record
	 *
	 * @param id
	 */
	public async listExtended(id: number) {
		return await this.requestManager.get<Schema.IListExtendedRecord>(`/lists/${id}/extended`, this.__token);
	}

	// Movie Informaiton ---------------------------------------------------------------------------

	/**
	 * Retrieve all available movie records
	 *
	 * @param page
	 */
	public async allMovies(page: number = 0) {
		return await this.requestManager.get<Schema.IMovieBaseRecord[]>(`/movies`, this.__token, {
			page
		});
	}

	/**
	 * Retrieve a specific movie record
	 *
	 * @param id
	 */
	public async movie(id: number) {
		return await this.requestManager.get<Schema.IMovieBaseRecord>(`/movies/${id}`, this.__token);
	}

	/**
	 * Retrieve a specific extended movie record
	 *
	 * @param id
	 */
	public async movieExtended(id: number) {
		let res = await this.requestManager.get<Raw.IMovieExtendedRecord>(`/movies/${id}/extended`, this.__token);
		return parse.movieRecord(res);
	}

	/**
	 * Retrieve all available movie statuses
	 */
	 public async movieStatuses() {
		return await this.requestManager.get<Schema.IStatus[]>(`/movies/statuses`, this.__token);
	}

	/**
	 * Retrieve tronslations for a movie
	 *
	 * @param id
	 * @param language
	 */
	public async movieTranslations(id: number, language: string) {
		return await this.requestManager.get<Schema.ITranslation>(`/movies/${id}/translations/${language}`, this.__token);
	}

	// People Information --------------------------------------------------------------------------

	/**
	 * Retrieve the different types of people
	 */
	public async personTypes() {
		return await this.requestManager.get<Schema.IPeopleType[]>(`/people/types`, this.__token);
	}

	/**
	 * Retrieve a specific person record
	 *
	 * @param id
	 */
	public async person(id: number) {
		return await this.requestManager.get<Schema.IPeopleBaseRecord>(`/people/${id}`, this.__token);
	}

	/**
	 * Retrieve a specific extended person record
	 *
	 * @param id
	 */
	public async personExtended(id: number) {
		let res = await this.requestManager.get<Raw.IPeopleExtendedRecord>(`/people/${id}/extended`, this.__token);
		return parse.peopleRecord(res);
	}

	/**
	 * Retrieve translations for a person
	 *
	 * @param id
	 * @param language
	 */
	public async personTranslations(id: number, language: string) {
		return await this.requestManager.get<Schema.ITranslation>(`/people/${id}/translations/${language}`, this.__token);
	}

	// Search Information --------------------------------------------------------------------------

	/**
	 * Search for content
	 *
	 * @param query  The query to search
	 * @param type   The constrained entity type
	 * @param year   The year associated with the entity
	 * @param offset The result offset
	 */
	public async search(query: string, type?: string, year?: number, offset?: number) {
		let res = await this.requestManager.get<Raw.ISearchResult[]>(`/search`, this.__token, {
			query, type, year, offset
		});
		return res.map(parse.searchResult);
	}

	// Season Information --------------------------------------------------------------------------

	/**
	 *Retrieve a specific season record
	 *
	 * @param id
	 */
	public async season(id: number) {
		return await this.requestManager.get<Schema.ISeasonBaseRecord>(`/seasons/${id}`, this.__token);
	}

	/**
	 * Retrieve a specific extended season record
	 *
	 * @param id
	 */
	public async seasonExtended(id: number) {
		let res = await this.requestManager.get<Raw.ISeasonExtendedRecord>(`/seasons/${id}`, this.__token);
		return parse.seasonRecord(res);
	}

	/**
	 * Retrieve all available season types
	 */
	public async seasonTypes() {
		let res = await this.requestManager.get<Schema.ISeasonType[]>(`/seasons/types`, this.__token);
	}

	/**
	 * Retrieve translations for a season
	 *
	 * @param id
	 * @param language
	 */
	public async seasonTranslations(id: number, language: string) {
		return await this.requestManager.get<Schema.ITranslation>(`/seasons/${id}/translations/${language}`, this.__token);
	}

	// Series Information --------------------------------------------------------------------------

	/**
	 * Retrieve all available series
	 */
	public async allSeries() {
		let res = await this.requestManager.get<Raw.ISeriesBaseRecord[]>(`/series`, this.__token);
		return res.map(parse.seriesRecord);
	}

	/**
	 * Retrieve a specific series record
	 */
	public async series(id: number) {
		let res = await this.requestManager.get<Raw.ISeriesBaseRecord>(`/series/${id}`, this.__token);
		return parse.seriesRecord(res);
	}

	/**
	 * Fetch a specific extended series record
	 */
	public async seriesExtended(id: number) {
		let res = await this.requestManager.get<Raw.ISeriesExtendedRecord>(`/series/${id}/extended`, this.__token);
		return parse.seriesRecord<Schema.ISeriesExtendedRecord>(res);
	}

	/**
	 * Retrieve all episode records within a series
	 */
	public async seriesEpisodes(id: number, seasonType: string = "default", page: number = 0) {
		let res = await this.requestManager.get<Raw.ISeriesEpisodes>(`/series/${id}/episodes/${seasonType}`, this.__token, {
			page,
			"season-type": seasonType
		});
		return <Schema.ISeriesEpisodes> {
			series: parse.seriesRecord(res.series),
			episodes: res.episodes.map(parse.episodeRecord)
		}
	}

	/**
	 * Retrieve translations for a series
	 *
	 * @param id
	 * @param language
	 */
	public async seriesTranslations(id: number, language: string) {
		return await this.requestManager.get<Schema.ITranslation>(`/series/${id}/translations/${language}`, this.__token);
	}

	/**
	 * Retrieve all available statuses for a series
	 */
	public async seriesStatuses() {
		return await this.requestManager.get<Schema.IStatus[]>(`/series/statuses`, this.__token);
	}

	/**
	 * Retrieve all updated entities
	 *
	 * @param since Timestamp in seconds
	 */
	public async updates(since: number | Date) {
		if (since instanceof Date) {
			since = since.getTime() / 1000;
		}
		let res = await this.requestManager.get<Raw.IEntityUpdate[]>(`/updates`, this.__token, {
			since
		});
		return res.map(parse.entityUpdate);
	}
}

