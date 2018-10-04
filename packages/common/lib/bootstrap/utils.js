"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const values = require("lodash.values");
const sortBy = require("lodash.sortby");
const callsite = require("callsite");
const glob = require("glob");
exports.getCallerPath = () => path_1.dirname(callsite()
    .find((s) => s.getFunctionName() === null)
    .getFileName());
exports.getInjectables = (path, files) => glob
    .sync(`${path}/**/*.+(${files.join('|')}){.ts,.js}`)
    .map((m) => require(m))
    .reduce((a, m) => [...a, ...values(m)], []);
exports.getAppInjectables = (path, files) => sortBy(exports.getInjectables(path, files), 'order').map((m) => m.provider);
//# sourceMappingURL=utils.js.map