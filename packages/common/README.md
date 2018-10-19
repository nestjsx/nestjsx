<p align="center">
  <a href="https://github.com/nestjsx/nestjsx/" target="blank"><img src="https://github.com/nestjsx/nestjsx/raw/master/img/logo.png" width="160" alt="Nestjsx Logo" /></a>
</p>
<p align="center">
  A set of opinionated <a href="https://github.com/nestjs/nest" target="blank">NestJS</a> extensions and modules
</p>
<p align="center">
  <a href="https://travis-ci.org/nestjsx/nestjsx"><img src="https://travis-ci.org/nestjsx/nestjsx.svg?branch=master" alt="Travis" /></a>
  <a href='https://coveralls.io/github/nestjsx/nestjsx?branch=master'><img src='https://coveralls.io/repos/github/nestjsx/nestjsx/badge.svg?branch=master' alt='Coverage Status' /></a>
</p>

# @nestjsx/common

A set of NestJs decorators, interfaces and configuration for application modules bootstraping.

## Table of Contents

- [Install](#install)
- [Decorators](#decorators)
  - [Module](#module-decorator)
  - [AppRootModule](#approotmodule-decorator)
- [Configuration](#configuration)

## Install

```bash
npm i --save @nestjsx/common
```

## Decorators

`@nestjsx/common` provides two module decorators: `@Module()` and `@AppRootModule()`.
They use [glob](https://www.npmjs.com/package/glob) to import module's files. Generally it looks like this:

### `/*.+(names){.ts,.js}`

The default list of files names can be found under [Configuration](#configuration) section.

### `@Module()` decorator

It allows to inject controllers, providers, import entities or models and export providers with minimum effort. To make this happen, a file that exports a module class should be placed in a root of module directory. e.g. we have `heroes` module where we have `heroes.module.ts` and some files alongside with it or under some subdirectories of this module: `heroes.service.ts`, `heroes.controller.ts`, `hero.entity.ts`.
In this case, `heroes.module.ts` can be like this:

```typescript
import { Module } from '@nestjsx/common';

@Module()
export class HeroesModule {}
```

The `@Module()` decorator will inject, import and export those components. Of course, we can override any decorator's config property as if we use native NestJS `@Module()` decorator ([docs](https://docs.nestjs.com/modules)).

Entities (models) can be imported if one of these has been installed: [@nestjs/typeorm](https://github.com/nestjs/typeorm) or [@nestjs/mongoose](https://github.com/nestjs/mongoose). Also the orm package name must be specified in the [Configuration](#configuration). e.g.

```json
...
"packages": {
  "orm": {
    "name": "@nestjs/typeorm"
  }
}
```

### `@AppRootModule()` decorator

It allows to import application modules and can be used as a NestJS root module. e.g. we have a module file `app.module.ts` in our `src` directory:

```typescript
import { AppRootModule } from '@nestjsx/common';

@AppRootModule()
export class AppModule {}
```

It will import modules and then we can use it the bootstrap function:

```typescript
...
const app = await NestFactory.create(AppModule);
```

For the sake of the idea of module's functionality incapsulation, `@AppRootModule` will not import all modules, but only those with the names that are specified in the [Configuration](#configuration). By default, they are `["global-module", "api-module"]` and can be changed in the configuration to meet your requirements.

`@AppRootModule` can also import global providers like _APP_GUARD_, _APP_INTERCEPTOR_, _APP_FILTER_ and _APP_PIPE_. e.g. we have a file `http-filter.app-provider.ts` (or we can call it `http.app-filter.ts`) somewhere in our `src` directory with the following:

```typescript
import { APP_FILTER } from '@nestjs/core';
import { NestjsxAppProvider } from '@nestjsx/common';

export const AppHttpFilterProvider = {
  order: 0,
  provider: {
    provide: APP_FILTER,
    useClass: HttpFilter,
  },
} as NestjsxAppProvider;
```

Since these files can be created anywhere in our project, we want to make sure that these global filters, guards, interceptors and pipes will be executed in a right order. To do so, we need to set an `order` property for each of them.

Files with those global components must be named according to `globalsPrefix` specified in the [Configuration](#configuration) (`app` as a default) and can be changed accordingly.

## Configuration

By default, configuration looks like this:

```json
"bootstrap": {
  "globalsPrefix": "app",
  "exportProviders": true,
  "files": {
    "modules": ["global-module", "api-module"],
    "providers": ["provider", "providers", "service", "helper", "gateway"],
    "controllers": ["controller"],
    "guards": ["guard"],
    "interceptors": ["interceptor"],
    "filters": ["filter"],
    "pipes": ["pipe"],
    "entities": ["entity"]
  }
},
"packages": {
  "orm": {
    "name": null
  }
}
```

Any of this params can be changed in the configuration file:

### `.nestrc`

You can create it in your project root or any other appropriate place (please refer to [rc](https://www.npmjs.com/package/rc) npm package for more details).
