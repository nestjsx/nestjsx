"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rc = require("rc");
const constants_1 = require("./constants");
const defaults = {
    bootstrap: {
        globalsPrefix: 'app',
        exportProviders: true,
        files: {
            modules: ['global-module', 'api-module'],
            providers: ['provider', 'providers', 'service', 'helper', 'gateway'],
            controllers: ['controller'],
            guards: ['guard'],
            interceptors: ['interceptor'],
            filters: ['filter'],
            pipes: ['pipe'],
            entities: ['entity'],
        },
    },
    packages: {
        orm: {
            name: null,
        },
    },
};
exports.apprc = rc(constants_1.CONFIG_NAME, defaults);
//# sourceMappingURL=apprc.js.map