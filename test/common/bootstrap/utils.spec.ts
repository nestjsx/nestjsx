import { join } from 'path';
import { Module } from '@nestjs/common';

import {
  getCallerPath,
  getInjectables,
  getAppInjectables,
  getEntities,
} from '../../../packages/common/src/bootstrap/utils';
import { OrmPackage } from '../../../packages/common/src/interfaces/nestjsx-rc.interface';
import { FixtureService } from '../fixtures/fixture.service';
import { AppFixtureProvider } from '../fixtures/fixture.app-provider';

const TestDecorator = () => {
  getCallerPath();
  return Module({});
};

// shouldn't throw an error
@TestDecorator()
export class TestCallerPath {}

describe('common', () => {
  describe('bootstrap', () => {
    describe('utils', () => {
      describe('getCallerPath', () => {
        it('should be a function', () => {
          expect(typeof getCallerPath).toBe('function');
        });

        it('should throw an error', () => {
          try {
            getCallerPath();
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
          }
        });
      });

      describe('getInjectables', () => {
        it('should throw an error', () => {
          const test = () => getInjectables();
          expect(test).toThrow();
        });
        it('should throw an error', () => {
          const test = () => getInjectables('path');
          expect(test).toThrow();
        });
        it('should throw an error', () => {
          const test = () => getInjectables('path', {});
          expect(test).toThrow();
        });
        it('should return an array of imports', () => {
          const test = () => getInjectables(join(__dirname, '../fixtures'), ['service']);
          expect(test()).toEqual(expect.arrayContaining([FixtureService]));
        });
      });

      describe('getAppInjectables', () => {
        it('should throw an error', () => {
          const test = () => getAppInjectables();
          expect(test).toThrow();
        });
        it('should throw an error', () => {
          const test = () => getAppInjectables('path');
          expect(test).toThrow();
        });
        it('should throw an error', () => {
          const test = () => getAppInjectables('path', {});
          expect(test).toThrow();
        });
        it('should throw an error', () => {
          const test = () =>
            getAppInjectables(join(__dirname, '../fixtures'), ['invalid-app-provider']);
          expect(test).toThrow();
        });
        it('should return an array of imports', () => {
          const test = () => getAppInjectables(join(__dirname, '../fixtures'), ['app-provider']);
          expect(test()).toEqual(expect.arrayContaining([AppFixtureProvider.provider]));
        });
      });

      describe('getEntities', () => {
        it('should return undefined', () => {
          const test = () => getEntities('path', {});
          expect(test()).toBeUndefined();
        });
        it('should throw an error', () => {
          const test = () => getEntities('path', {}, 'invalidOrm');
          expect(test).toThrow();
        });
        it('should return undefined', () => {
          const test = () =>
            getEntities(
              join(__dirname, '../fixtures'),
              ['typeorm-entity'],
              '@nestjs/elasticsearch',
            );
          expect(test()).toBeUndefined();
        });
        it('should return @nestjs/typeorm forFeature', () => {
          const test = () =>
            getEntities(join(__dirname, '../fixtures'), ['typeorm-entity'], OrmPackage.TypeOrm);
          expect(test()).toBeTruthy();
        });
        it('should return @nestjs/monggose forFeature', () => {
          const test = () =>
            getEntities(join(__dirname, '../fixtures'), ['mongoose-model'], OrmPackage.Mongoose);
          expect(test()).toBeTruthy();
        });
      });
    });
  });
});
