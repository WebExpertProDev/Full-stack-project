import setAuthorizationToken from "../../src/utils/authorizationToken";
import { request } from "../../src/utils/request";
import { setCookie, deleteCookie, redirect } from "../../src/utils/utils";

import { SET_CURRENT_USER } from "./types";

export function isAuthenticated(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}

export const logout = () => async dispatch => {
	deleteCookie("user_profile");
	dispatch(isAuthenticated({}));
	setAuthorizationToken(false);
	redirect("/");
	await request({
		url: "/rest-auth/logout/",
		method: "POST"
	});
};

export function loginForm(data) {
	return async dispatch => {
		const getToken = await request({
			url: "/rest-auth/login",
			method: "POST",
			data
		});

		const userData = getToken.data;
		const userDataToString = JSON.stringify(userData);

		setCookie("user_profile", userDataToString, { days: 1 });

		dispatch(isAuthenticated({ ...userData }));

		setAuthorizationToken(userData.key);

		return getToken.data;
	};
}

export async function signupForm(data) {
	const signupData = await request({
		url: "/rest-auth/registration/",
		method: "POST",
		data
	});

	return signupData;
}
