// tslint:disable: radix
import IConfigInterface from "../interfaces/IConfigInterface";

// tslint:disable-next-line: no-var-requires
require("dotenv").config();

const config: IConfigInterface = {
  gateway: {
    port: parseInt(process.env.GATEWAY_PORT) || 8000
  },
  server: {
    port: parseInt(process.env.SERVER_PORT) || 8002
  },
  database: {
    uri: process.env.DB_URI || "",
    port: parseInt(process.env.DB_PORT) || 27017,
    name: process.env.DB_NAME || "tythus"
  },
  environment: process.env.NODE_ENV || "development",
  secretOrKey: process.env.SECRET_OR_KEY || "secret"
};

export default config;
