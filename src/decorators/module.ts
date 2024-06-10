import "reflect-metadata";

export const CONTROLLERS_KEY = "controllers";
export const PROVIDERS_KEY = "providers";
export const IMPORTS_KEY = "imports";
export const DESIGN_PARAM_TYPES = "design:paramtypes";

export interface ClassType<T = any> {
  new (...args: any[]): T;
}

export interface ModuleMetadata {
  controllers?: ClassType[];
  providers?: ClassType[];
  imports?: ClassType[];
}

export function Module(metadata: ModuleMetadata) {
  return function (constructor: Function) {
    Reflect.defineMetadata(
      CONTROLLERS_KEY,
      metadata.controllers || [],
      constructor
    );
    Reflect.defineMetadata(
      PROVIDERS_KEY,
      metadata.providers || [],
      constructor
    );
    Reflect.defineMetadata(IMPORTS_KEY, metadata.imports || [], constructor);
  };
}
