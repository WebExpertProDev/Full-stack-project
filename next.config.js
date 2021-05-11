const withCss = require('@zeit/next-css')
const withSaas = require('@zeit/next-sass')

require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const isServer = typeof window === "undefined";


module.exports = withCss(withSaas({
    webpack: (config, { isServer }) => {
        config.plugins = config.plugins || [];

        config.resolve.alias["src"] = path.join(__dirname, "src");
        config.resolve.alias["components"] = path.join(__dirname, "components");
        config.resolve.alias["reduxs"] = path.join(__dirname, "redux");
        config.resolve.alias["layouts"] = path.join(__dirname, "layouts");
        config.resolve.alias["public"] = path.join(__dirname, "public/static");

        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, ".env"),
                systemvars: true
            })
        ];

        if (isServer) {
            const antStyles = /antd\/.*?\/style\/css.*?/
            const origExternals = [...config.externals]
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback()
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ]

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            })
        } else {
            config.resolve.alias["@sentry/node"] = "@sentry/browser";
        }
        return config
    },
}))
