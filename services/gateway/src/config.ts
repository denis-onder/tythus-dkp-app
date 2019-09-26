import IConfigInterface from "./interfaces/IConfigInterface";

const config: IConfigInterface = {
  auth: {
    port: parseInt(process.env.AUTH_PORT) || 8001
  },
  guild: {
    port: parseInt(process.env.GUILD_PORT) || 8002
  },
  server: {
    port: parseInt(process.env.SERVER_PORT) || 8000
  },
  database: {
    port: parseInt(process.env.DB_PORT) || 27017
  },
  environment: process.env.NODE_ENV || "development"
};

export default config;
