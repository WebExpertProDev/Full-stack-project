"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devProxy = {
    '/api': {
        target: '',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
    },
};
exports.default = devProxy;
