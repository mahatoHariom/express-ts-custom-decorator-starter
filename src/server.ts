import 'reflect-metadata'
import { AppModule } from "./app/app.module";
import { createApp } from "./app/createApp";
import { logger } from "./infrastructure/middlewares/morgan";
const app = createApp(AppModule);
app.listen(process.env.PORT, () => logger.info(`Server running on port ${process.env.PORT} `));