"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const apprc_1 = require("../apprc");
const utils_1 = require("./utils");
/**
 * Module decorator
 * @param opt ModuleMetadata
 */
exports.Module = (opt = {}) => {
    const path = utils_1.getCallerPath();
    const { files, exportProviders, ormPackage } = apprc_1.apprc.bootstrap;
    const controllers = opt.controllers ? opt.controllers : utils_1.getInjectables(path, files.controllers);
    const providers = opt.providers ? opt.providers : utils_1.getInjectables(path, files.providers);
    const entities = utils_1.getEntities(path, files.entities, ormPackage);
    const imports = opt.imports ? opt.imports : [];
    const exports = opt.exports ? opt.exports : exportProviders ? providers : [];
    return common_1.Module({
        imports: entities ? [entities, ...imports] : imports,
        controllers,
        providers,
        exports,
    });
};
/**
 * App root module decorator
 * @param opt ModuleMetadata
 */
exports.AppRootModule = (opt = { imports: [] }) => {
    const path = utils_1.getCallerPath();
    const { files, globalsPrefix } = apprc_1.apprc.bootstrap;
    const injectables = [
        ...files.providers,
        ...files.pipes,
        ...files.interceptors,
        ...files.guards,
        ...files.filters,
    ].map((name) => `${globalsPrefix}-${name}`);
    const imports = utils_1.getInjectables(path, files.modules);
    const providers = utils_1.getAppInjectables(path, injectables);
    return common_1.Module({ imports: [...imports, ...opt.imports], providers });
};
//# sourceMappingURL=modules.decorators.js.map