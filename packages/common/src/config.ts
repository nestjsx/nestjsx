import rc = require('rc');
import { NestjsxConfig } from './interfaces/nestjsx-config.interface';
import { CONFIG_NAME } from './constants';

const defaults = <NestjsxConfig>{
  appGlobalsPrefix: 'app',
  autoExports: true,
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
};

export const config = rc(CONFIG_NAME, defaults) as NestjsxConfig;
