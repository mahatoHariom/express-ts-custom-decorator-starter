import "reflect-metadata"

export class DIContainer {
  private services: Map<any, any> = new Map();

  get<T>(someClass: { new (...args: any[]): T }): T {
    const existingInstance = this.services.get(someClass);
    if (existingInstance) {
      return existingInstance;
    }

    const instance = new someClass(...this.resolveDependencies(someClass));
    this.services.set(someClass, instance);
    return instance;
  }

  private resolveDependencies(someClass: any): any[] {
    const dependencies =
      Reflect.getMetadata("design:paramtypes", someClass) || [];
    return dependencies.map((dependency: any) => this.get(dependency));
  }
}

export const diContainer = new DIContainer();
