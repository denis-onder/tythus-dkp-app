import IConfigInterface from "./interfaces/IConfigInterface";

const config: IConfigInterface = {
  server: {
    port: parseInt(process.env.SERVER_PORT) || 8001
  },
  database: {
    port: parseInt(process.env.DB_PORT) || 27017
  },
  environment: process.env.NODE_ENV || "development"
};

export default config;
