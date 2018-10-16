"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const values = require("lodash.values");
const sortBy = require("lodash.sortby");
const callsites = require("callsites");
const glob = require("glob");
const interfaces_1 = require("../interfaces");
const isUndefined = (value) => typeof value === 'undefined';
exports.getCallerPath = () => path_1.dirname(callsites()
    .filter((s) => s.getMethodName() === null && s.getFileName() !== null)[0]
    .getFileName());
exports.getInjectables = (path, files) => glob
    .sync(`${path}/**/*.+(${files.join('|')}){.ts,.js}`)
    .map((m) => require(m))
    .reduce((a, m) => [...a, ...values(m)], []);
exports.getAppInjectables = (path, files) => {
    const imports = exports.getInjectables(path, files);
    const sorted = sortBy(imports, 'order');
    return sorted.map((m) => {
        if (isUndefined(m) || isUndefined(m.order) || isUndefined(m.provider)) {
            throw new Error('App injectable must be NesjsxAppProvider');
        }
        return m.provider;
    });
};
exports.getEntities = (path, files, ormPackage) => {
    if (ormPackage) {
        try {
            const orm = require(ormPackage);
            const entities = exports.getInjectables(path, files);
            switch (ormPackage) {
                case interfaces_1.OrmPackage.TypeOrm: {
                    return orm.TypeOrmModule.forFeature(entities);
                }
                case interfaces_1.OrmPackage.Mongoose: {
                    return orm.MongooseModule.forFeature(entities);
                }
                default: {
                    return undefined;
                }
            }
        }
        catch (error) {
            throw new Error(`${ormPackage} must be instaled`);
        }
    }
    return undefined;
};
//# sourceMappingURL=utils.js.map