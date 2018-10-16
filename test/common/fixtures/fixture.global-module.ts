import { Global } from '@nestjs/common';

import { Module } from '../../../packages/common/src/bootstrap/modules.decorators';

@Global()
@Module()
export class FixtureGlobalModule {}

@Global()
@Module({
  controllers: [],
  providers: [],
  imports: [],
  exports: [],
})
export class FixtureGlobalModule1 {}
