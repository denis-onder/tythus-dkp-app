import express from "express";
import config from "./config";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express.application;
    this.init();
  }
  private init() {
    // Initialize middleware here
    console.log("Initializing server...");
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
