import winston from "winston";
import morgan from "morgan";

const env = process.env.NODE_ENV || "development";
const isDevelopment = env === "development";

// Define logging levels and colors
const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};
winston.addColors(colors);

// Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
  )
);

// Create logger with console and file transports
const logger = winston.createLogger({
  level: isDevelopment ? "debug" : "warn",
  levels,
  format,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/all.log" }),
  ],
});

// Morgan middleware for HTTP request logging
const morganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  {
    stream: { write: (message) => logger.http(message.trim()) },
    skip: () => !isDevelopment,
  }
);

export { logger, morganMiddleware };
