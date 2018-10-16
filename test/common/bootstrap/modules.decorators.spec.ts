import { Test } from '@nestjs/testing';

import { AppModule } from '../fixtures/fixture.root-module';
import { FixtureGlobalModule, FixtureGlobalModule1 } from '../fixtures/fixture.global-module';

describe('common', () => {
  describe('bootstrap', () => {
    describe('modules.decorators', () => {
      let testModule: any;

      beforeAll(async () => {
        testModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
      });

      describe('AppRootModule', () => {
        it('should create root app module', () => {
          expect(testModule.get<AppModule>(AppModule)).toBeTruthy();
        });
        it('should create a module', () => {
          expect(testModule.get<FixtureGlobalModule>(FixtureGlobalModule)).toBeTruthy();
          expect(testModule.get<FixtureGlobalModule1>(FixtureGlobalModule1)).toBeTruthy();
        });
      });
    });
  });
});
