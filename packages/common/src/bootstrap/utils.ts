import { dirname } from 'path';
import values = require('lodash.values');
import sortBy = require('lodash.sortby');
import * as callsite from 'callsite';
import * as glob from 'glob';
import { NesjsxAppProvider } from '../interfaces';

export const getCallerPath = (): string =>
  dirname(
    callsite()
      .find((s) => s.getFunctionName() === null)
      .getFileName(),
  );

export const getInjectables = (path: string, files: string[]) =>
  glob
    .sync(`${path}/**/*.+(${files.join('|')}){.ts,.js}`)
    .map((m) => require(m))
    .reduce((a, m) => [...a, ...values(m)], []);

export const getAppInjectables = (path: string, files: string[]) =>
  sortBy(getInjectables(path, files), 'order').map((m: NesjsxAppProvider) => m.provider);
