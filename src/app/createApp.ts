import express from "express";

import { ClassType } from "../decorators/module";
import { processModule, registerControllers } from "./registerControllers";
import ErrorHandler from "../infrastructure/middlewares/error-handler";
import dotenv from "dotenv";
import { morganMiddleware } from "../infrastructure/middlewares/morgan";
import compression from "compression";
import cors from 'cors'
import helmet from "helmet";

dotenv.config();
export function createApp(mainModule: ClassType) {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression);
  app.use(cors)
  app.use(helmet)
  app.use(morganMiddleware);

  const providerInstances = new Map<ClassType, any>();

  const controllers = processModule(mainModule, providerInstances);
  registerControllers(app, controllers, providerInstances);

  app.use(ErrorHandler);

  return app;
}
