import ApiRequestManager from "./request";


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
		let response = await this.requestManager.post("/login", undefined, undefined, body);
		this.__token = response.data.token;
	}
}

