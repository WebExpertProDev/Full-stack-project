import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducers from "./redux/reducers/rootReducers";
import {isServer} from "./src/utils/utils";

const middleware = [thunkMiddleware];
let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production" && !isServer) {
	// middleware.push(createLogger()); // log actions in console;
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const makeConfiguredStore = (reducer, initialState) => createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export const makeStore = (initialState, { isServer }) => {
	if (isServer) {
		initialState = initialState || {
			auth: {
				isAuthenticated: false,
				user: {}
			}
		};

		return makeConfiguredStore(rootReducers, initialState);
	} else {
		const { persistStore, persistReducer } = require("redux-persist");
		const storage = require("redux-persist/lib/storage").default;

		const persistConfig = {
			key: "HOC_APP",
			storage,
			whitelist: ["auth"]
		};

		const persistedReducer = persistReducer(persistConfig, rootReducers);
		const store = makeConfiguredStore(persistedReducer, initialState);

		store.__persistor = persistStore(store); // Nasty hack

		return store;
	}
};
