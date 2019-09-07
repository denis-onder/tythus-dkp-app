import morgan from "morgan";
import path from "path";
import fs from "fs";
import { Application } from "express";

export default (app: Application, logName: String) => {
  const folderPath = path.resolve(__dirname, "../logs");
  // Create a folder if it does not exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  const accessLogStream = fs.createWriteStream(
    path.join(folderPath, `${logName}.log`),
    { flags: "a" }
  );
  app.use(morgan("combined", { stream: accessLogStream }));
};
