import IConfigInterface from "./interfaces/IConfigInterface";

const config: IConfigInterface = {
  server: {
    port: parseInt(process.env.SERVER_PORT) || 8000
  },
  environment: process.env.NODE_ENV || "development"
};

export default config;
