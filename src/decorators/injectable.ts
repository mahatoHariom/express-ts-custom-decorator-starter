import { diContainer } from "../infrastructure/config/diContainer";


export function Injectable(): ClassDecorator {
  return (target: any) => {
    diContainer.get(target);
  };
}
