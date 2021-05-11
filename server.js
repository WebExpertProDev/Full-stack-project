const express = require("express");
const next = require("next");
// const nextI18NextMiddleware = require("next-i18next/middleware").default;
const includes = require("lodash/includes");

const routes = require("./routes");
// const nextI18next = require("./i18n");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

(async () => {
    await app.prepare();
    const server = express();

    const serviceWorkers = [
        {
            filename: "service-worker.js",
            path: "./static/service-worker.js"
        },
        {
            filename: "firebase-messaging-sw.js",
            path: "./static/firebase-messaging-sw.js",
        }
    ];

    serviceWorkers.forEach(({ filename, path }) => {
        server.get(`/${filename}`, (req, res) => {
            app.serveStatic(req, res, path);
        });
    });

    // server.use(nextI18NextMiddleware(nextI18next));
    server.use(cookieParser());

    // server.get("/dashboard", (req, res) => {
    // 	const { cookies } = req;
    // 	const { user } = JSON.parse(cookies.user_profile);
    // 	let userType = user.user_type;

    // 	return res.redirect(`/dashboard/${userType}`);
    // });

    server.get("*", (req, res) => handler(req, res));

    await server.listen(port);
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
