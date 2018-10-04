import { OrmPackage } from '../interfaces';
export declare const getCallerPath: () => string;
export declare const getInjectables: (path: string, files: string[]) => any;
export declare const getAppInjectables: (path: string, files: string[]) => import("@nestjs/common/interfaces/modules/provider.interface").Provider[];
export declare const getEntities: (path: string, files: string[], ormPackage: OrmPackage) => any;
