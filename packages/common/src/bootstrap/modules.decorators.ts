import { Module as NestModule } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { apprc } from '../apprc';
import { getCallerPath, getInjectables, getEntities, getAppInjectables } from './utils';

/**
 * Module decorator
 * @param opt ModuleMetadata
 */
export const Module = (opt: ModuleMetadata = {}): Function => {
  const path = getCallerPath();
  const { files, exportProviders, ormPackage } = apprc.bootstrap;

  const controllers = opt.controllers ? opt.controllers : getInjectables(path, files.controllers);
  const providers = opt.providers ? opt.providers : getInjectables(path, files.providers);
  const entities = getEntities(path, files.entities, ormPackage);
  const imports = opt.imports ? opt.imports : [];
  const exports = opt.exports ? opt.exports : exportProviders ? providers : [];

  return NestModule({
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
export const AppRootModule = (opt: ModuleMetadata = { imports: [] }): Function => {
  const path = getCallerPath();
  const { files, globalsPrefix } = apprc.bootstrap;
  const injectables = [
    ...files.providers,
    ...files.pipes,
    ...files.interceptors,
    ...files.guards,
    ...files.filters,
  ].map((name) => `${globalsPrefix}-${name}`);

  const imports = getInjectables(path, files.modules);
  const providers = getAppInjectables(path, injectables);

  return NestModule({ imports: [...imports, ...opt.imports], providers });
};
