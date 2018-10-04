import rc = require('rc');
import { NestjsxConfig, OrmPackage } from './interfaces/nestjsx-config.interface';
import { CONFIG_NAME } from './constants';

const defaults = <NestjsxConfig>{
  bootstrap: {
    globalsPrefix: 'app',
    exportProviders: true,
    useOrmPackage: false,
    ormPackage: null,
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
};

export const apprc = rc(CONFIG_NAME, defaults) as NestjsxConfig;
