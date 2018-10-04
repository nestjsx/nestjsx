export interface NestjsxConfig {
    appName?: string;
    bootstrap: {
        globalsPrefix: string;
        exportProviders: boolean;
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
    };
    packages: {
        orm: OrmPackage;
    };
}
export declare enum OrmPackage {
    TypeOrm = "@nestjs/typeorm",
    Mongoose = "@nestjs/mongoose"
}
