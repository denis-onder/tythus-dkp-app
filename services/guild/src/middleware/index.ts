import { Application } from "express";
import bodyParser from "body-parser";
import logger from "./logger";
import Router from "../Router";

export default (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  Router.initialize(app);
  logger(app);
};
