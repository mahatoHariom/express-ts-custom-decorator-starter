type ParamType = "body" | "req" | "res" | "next" | "currentUser";

function createParamDecorator(type: ParamType) {
  return (): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
      const existingParameters: Array<any> =
        Reflect.getMetadata(propertyKey.toString(), target) || [];
      existingParameters.push({ index: parameterIndex, type });
      Reflect.defineMetadata(
        propertyKey.toString(),
        existingParameters,
        target
      );
    };
  };
}

export const Body = createParamDecorator("body");
export const Req = createParamDecorator("req");
export const Res = createParamDecorator("res");
export const Next = createParamDecorator("next");
export const CurrentUser = createParamDecorator("currentUser");
