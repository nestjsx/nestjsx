export interface NestjsxConfig {
    appName?: string;
    bootstrap: {
        globalsPrefix: string;
        exportProviders: boolean;
        ormPackage: OrmPackage;
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
}
export declare enum OrmPackage {
    TypeOrm = "@nestjs/typeorm",
    Mongoose = "@nestjs/mongoose"
}
