import { Application } from "express";
import bodyParser from "body-parser";
import logger from "./logger";

export default (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  logger(app);
};
