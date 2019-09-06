import express from "express";
import config from "./config";
import applyMiddleware from "./middleware";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.init();
  }
  private init() {
    console.log("Initializing server...");
    applyMiddleware(this.app);
    this.app.get("/", (req: express.Request, res: express.Response) =>
      res.status(200).send("Tythus Gateway.")
    );
  }
  /**
   * Start the server
   */
  public start() {
    this.app.listen(config.server.port, () =>
      console.log(
        `Server running!\nEnvironment: ${config.environment}\nAddress: http://localhost:${config.server.port}/`
      )
    );
  }
  /**
   * Stop the server
   */
  public stop(error = false) {
    let exitCode = 0;
    if (error) {
      exitCode = 1;
    }
    console.log(
      exitCode === 0 ? "Server shutting down." : "An error has occured!\n",
      error
    );
    process.exit(exitCode);
  }
}

export default new Server();
