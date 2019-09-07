import express from "express";
import http from "http";
import applyMiddleware from "./middleware";
import io from "socket.io";

class Server {
  public app: express.Application;
  public serverName: String;
  public io;
  public server;
  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);
    this.io = io(this.server);
  }
  private init() {
    console.log("Initializing server...");
    applyMiddleware(this.app, this.serverName);
    this.app.get("/", (req: express.Request, res: express.Response) =>
      res.status(200).send("Root")
    );
  }
  /**
   * Start the server
   */
  public start(port, environment) {
    this.init();
    this.server.listen(port, () =>
      console.log(
        `${this.serverName} service running!\nEnvironment: ${environment}\nAddress: http://localhost:${port}/`
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

export default Server;
