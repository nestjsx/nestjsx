import { Provider } from '@nestjs/common';

export interface NestjsxAppProvider {
  order: number;
  provider: Provider;
}
