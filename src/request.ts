import https, {RequestOptions} from "https";

/**
 * The API URL
 */
const API_URL = "https://api4.thetvdb.com/v4";

/**
 * A status error is used to indicate responses with non-200 status codes
 */
export class StatusError<T = any> extends Error
{
	/**
	 * The resulting body of a response
	 */
	public readonly response: T;

	/**
	 * The resulting status code of a response
	 */
	public readonly statusCode?: number;

	/**
	 * Create a new error indicating non-200 status
	 */
	public constructor(response: T, statusCode?: number, ...args: any[]) {
		super(...args);
		Object.setPrototypeOf(this, StatusError.prototype);
		this.response = response;
		this.statusCode = statusCode;
	}
}

/**
 * The API response structure
 */
export interface IApiResponse<T> {
	status: string,
	data  : T
}

/**
 * A request manager with atomic/persistent request options
 */
export default class ApiRequestManager
{
	/**
	 * Store additional request options
	 */
	protected options: RequestOptions;

	/**
	 * Create a new API request manager
	 *
	 * @param options Additional request options
	 */
	public constructor(options: RequestOptions = {}) {
		this.options = options;
	}

	/**
	 * Perform a generic HTTPS request
	 *
	 * @param method    The HTTP method
	 * @param url       The URL to request
	 * @param authToken An optional bearer token
	 * @param params    Optional parameters
	 * @param body      Optional body
	 */
	protected request<T>(method: string, url: string, authToken?: string, params?: any,
	                     body?: string)
	{
		return new Promise<T>((resolve, reject) => {
			// Create request options
			let options = Object.assign({ method, headers: {} }, this.options);
			if (authToken) {
				options.headers["Authorization"] = `Bearer ${authToken}`;
			}
			if (body) {
				options.headers["Content-Type"] = "application/json";
				options.headers["Content-Length"] = body.length;
			}

			// Add search parameters if necessary
			let requestUrl = new URL(url);
			if (params) {
				Object.keys(params).forEach((key) => {
					if (params[key] !== undefined) {
						requestUrl.searchParams.set(key, params[key]);
					}
				});
			}

			// Create the request
			let request = https.request(<any>requestUrl, options, (res) => {
				let rawData: string = "";
				res.setEncoding("utf8");
				res.on("data", chunk => {rawData += chunk});
				res.on("error", reject);
				res.on("end", () => {
					let response: IApiResponse<T> = JSON.parse(rawData);
					if (res.statusCode == 200) {
						resolve(response.data)
					} else {
						reject(new StatusError(response, res.statusCode));
					}
				});
			})
			.on("error", reject)
			.on("timeout", () => reject("timeout"));
			if (body) {
				request.write(body);
			}
			request.end();
		});
	}

	/**
	 * Perform a generic GET request
	 */
	public async get<T = any>(path: string, authToken?: string, params?: any) {
		return await this.request<T>("GET", `${API_URL}${path}`, authToken);
	}

	/**
	 * Perform a generic POST request
	 */
	public async post<T = any>(path: string, authToken?: string, params?: any, body?: any) {
		if (body !== undefined) {
			body = JSON.stringify(body);
		}
		return await this.request<T>("POST", `${API_URL}${path}`, authToken, params, body);
	}
}
