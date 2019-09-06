import IConfigInterface from "./interfaces/IConfigInterface";

const config: IConfigInterface = {
  gateway: {
    server: {
      port: parseInt(process.env.GATEWAY_SERVER_PORT) || 8000
    },
    environment: process.env.NODE_ENV || "development"
  },
  auth: {
    server: {
      port: parseInt(process.env.AUTH_SERVER_PORT) || 8001
    },
    environment: process.env.NODE_ENV || "development"
  },
  guild: {
    server: {
      port: parseInt(process.env.GUILD_SERVER_PORT) || 8002
    },
    environment: process.env.NODE_ENV || "development"
  }
};

export default config;
