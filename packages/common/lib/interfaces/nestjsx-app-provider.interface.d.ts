import { Provider } from '@nestjs/common';
export interface NesjsxAppProvider {
    order: number;
    provider: Provider;
}
