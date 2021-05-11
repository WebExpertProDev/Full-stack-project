import axios from "axios";
import assign from "lodash/assign";
import setAuthorizationToken from "./authorizationToken";
// import settings from '../../now.json';

const isServer = typeof window === "undefined";

/**
 * Default Axios and Interceptor
 */
axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

if (!isServer) {
	const auth = localStorage.getItem('auth');

	if (auth) {
		const { key } = JSON.parse(auth);
		setAuthorizationToken(key);
	}
}

// // Add a response interceptor
axios.interceptors.response.use(
	function(response) {
		return response;
	},
	function(error) {
		// AuthorizationToken invalid
		if (error.response && error.response.status === 401) {
			if (!isServer) {
				localStorage.removeItem('auth');
				window.location.href = '/auth/login';
			} else {
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

export const request = options => {
	const opts = assign(
		{
			method: "get",
			timeout: 20000
		},
		options
	);
	return axios(opts);
};
