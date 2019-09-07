import Server from "../../Server";
import config from "./config";
import ISocketInterface from "../../interfaces/ISocketInterface";

class AuthService extends Server {
  constructor() {
    super();
    this.serverName = "Authentication";
  }
  private sockets() {
    console.log("Sockets established!");
    this.io.on("connection", (socket: ISocketInterface) => {
      // Socket declarations for the authentication service go here
    });
  }
  public startService() {
    this.start(config.server.port, config.environment);
    this.sockets();
  }
}

export default new AuthService();
