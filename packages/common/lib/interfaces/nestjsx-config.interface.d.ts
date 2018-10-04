export interface NestjsxConfig {
    appName?: string;
    appGlobalsPrefix: string;
    autoExports: boolean;
    files: {
        modules: string[];
        providers: string[];
        controllers: string[];
        guards: string[];
        interceptors: string[];
        filters: string[];
        pipes: string[];
        entities: string[];
    };
}
