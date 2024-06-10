import "reflect-metadata";
import { Middleware } from "../domain/@types/common";


export function UseMiddlewares(...middlewares: Middleware[]): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (!Reflect.hasMetadata("middlewares", target.constructor)) {
      Reflect.defineMetadata("middlewares", {}, target.constructor);
    }

    const middlewaresMap = Reflect.getMetadata(
      "middlewares",
      target.constructor
    ) as Record<string | symbol, Middleware[]>;
    middlewaresMap[propertyKey] = middlewares;
    Reflect.defineMetadata("middlewares", middlewaresMap, target.constructor);
  };
}
