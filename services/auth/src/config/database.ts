import { connect } from "mongoose";
import config from "./";

const connectionURI =
  config.environment === "development"
    ? config.database.uri
    : `mongodb://localhost:${config.database.port}/${config.database.name}`;

export default () =>
  connect(
    `${connectionURI}`,
    { useNewUrlParser: true },
    err => {
      if (err) {
        console.error(`Mongoose:\nAn error has occured!\nTrace:\n${err}`);
        process.exit(1);
      }
      console.log("Database connection established!");
    }
  );
