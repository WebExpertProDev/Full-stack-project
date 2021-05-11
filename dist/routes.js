"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// we should install next-routes first
// yarn add next-routes
const nextRoutes = require('next-routes');
const routes = (module.exports = nextRoutes());
// we can configure Routes
routes.add('home', '/');
exports.default = routes;
