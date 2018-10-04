import { Module as NestModule } from '@nestjs/common/decorators';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { config } from '../config';
import { getCallerPath, getInjectables, getAppInjectables } from './utils';

/**
 * Module decorator
 * @param opt ModuleMetadata
 */
export const Module = (opt: ModuleMetadata = {}): Function => {
  const path = getCallerPath();
  const { files, autoExports } = config;

  const controllers = opt.controllers ? opt.controllers : getInjectables(path, files.controllers);
  const providers = opt.providers ? opt.providers : getInjectables(path, files.providers);
  const imports = opt.imports ? opt.imports : [];
  const exports = opt.exports ? opt.exports : autoExports ? providers : [];

  return NestModule({ imports, controllers, providers, exports });
};

/**
 * App root module decorator
 * @param opt ModuleMetadata
 */
export const AppRootModule = (opt: ModuleMetadata = { imports: [] }): Function => {
  const path = getCallerPath();
  const { files, appGlobalsPrefix } = config;
  const injectables = [
    ...files.providers,
    ...files.pipes,
    ...files.interceptors,
    ...files.guards,
    ...files.filters,
  ].map((name) => `${appGlobalsPrefix}-${name}`);

  const imports = getInjectables(path, files.modules);
  const providers = getAppInjectables(path, injectables);

  return NestModule({
    imports: [...imports, ...opt.imports],
    providers,
  });
};
