import axios from "axios";

export default function setAuthorizationToken(key) {
	if (key) {
		axios.defaults.headers.common["Authorization"] = `Token ${key}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
}
