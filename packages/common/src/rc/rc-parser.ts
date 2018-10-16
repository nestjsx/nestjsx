import rc = require('rc');
import { NestjsxRC } from '../interfaces/nestjsx-rc.interface';
import { RC_NAME } from '../constants';

export const defaults = <NestjsxRC>{
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

export const apprc = rc(RC_NAME, defaults) as NestjsxRC;
