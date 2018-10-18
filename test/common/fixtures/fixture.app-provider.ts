import { NestjsxAppProvider } from '../../../packages/common/src/interfaces/nestjsx-app-provider.interface';

export const AppFixtureProvider = {
  order: 0,
  provider: {
    provide: 'token',
    useValue: 'value',
  },
} as NestjsxAppProvider;
