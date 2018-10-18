import { dirname } from 'path';
import values = require('lodash.values');
import sortBy = require('lodash.sortby');
import * as callsites from 'callsites';
import * as glob from 'glob';
import { NestjsxAppProvider, OrmPackage } from '../interfaces';

const isUndefined = (value) => typeof value === 'undefined';

export const getCallerPath = (): string =>
  dirname(
    callsites()
      .filter((s) => s.getMethodName() === null && s.getFileName() !== null)[0]
      .getFileName(),
  );

export const getInjectables = (path: string, files: string[]) =>
  glob
    .sync(`${path}/**/*.+(${files.join('|')}){.ts,.js}`)
    .map((m) => require(m))
    .reduce((a, m) => [...a, ...values(m)], []);

export const getAppInjectables = (path: string, files: string[]) => {
  const imports = getInjectables(path, files);
  const sorted = sortBy(imports, 'order');

  return sorted.map((m: NestjsxAppProvider) => {
    if (isUndefined(m) || isUndefined(m.order) || isUndefined(m.provider)) {
      throw new Error('App injectable must be NesjsxAppProvider');
    }
    return m.provider;
  });
};

export const getEntities = (path: string, files: string[], ormPackage: OrmPackage) => {
  if (ormPackage) {
    try {
      const orm = require(ormPackage);
      const entities = getInjectables(path, files);
      switch (ormPackage) {
        case OrmPackage.TypeOrm: {
          return orm.TypeOrmModule.forFeature(entities);
        }
        case OrmPackage.Mongoose: {
          return orm.MongooseModule.forFeature(entities);
        }
        default: {
          return undefined;
        }
      }
    } catch (error) {
      throw new Error(`${ormPackage} must be instaled`);
    }
  }

  return undefined;
};
