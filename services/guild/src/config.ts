import IConfigInterface from "./interfaces/IConfigInterface";

const config: IConfigInterface = {
  server: {
    port: parseInt(process.env.GUILD_SERVER_PORT) || 8002
  },
  environment: process.env.NODE_ENV || "development"
};

export default config;
