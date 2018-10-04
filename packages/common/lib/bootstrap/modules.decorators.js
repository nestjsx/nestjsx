"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("@nestjs/common/decorators");
const config_1 = require("../config");
const utils_1 = require("./utils");
/**
 * Module decorator
 * @param opt ModuleMetadata
 */
exports.Module = (opt = {}) => {
    const path = utils_1.getCallerPath();
    const { files, autoExports } = config_1.config;
    const controllers = opt.controllers ? opt.controllers : utils_1.getInjectables(path, files.controllers);
    const providers = opt.providers ? opt.providers : utils_1.getInjectables(path, files.providers);
    const imports = opt.imports ? opt.imports : [];
    const exports = opt.exports ? opt.exports : autoExports ? providers : [];
    return decorators_1.Module({ imports, controllers, providers, exports });
};
/**
 * App root module decorator
 * @param opt ModuleMetadata
 */
exports.AppRootModule = (opt = { imports: [] }) => {
    const path = utils_1.getCallerPath();
    const { files, appGlobalsPrefix } = config_1.config;
    const injectables = [
        ...files.providers,
        ...files.pipes,
        ...files.interceptors,
        ...files.guards,
        ...files.filters,
    ].map((name) => `${appGlobalsPrefix}-${name}`);
    const imports = utils_1.getInjectables(path, files.modules);
    const providers = utils_1.getAppInjectables(path, injectables);
    return decorators_1.Module({
        imports: [...imports, ...opt.imports],
        providers,
    });
};
//# sourceMappingURL=modules.decorators.js.map