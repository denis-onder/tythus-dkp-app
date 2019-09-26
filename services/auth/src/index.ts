import Server from "./Server";
import config from "./config";
import connectDB from "./config/database";
import io from "socket.io-client";

class AuthService extends Server {
  constructor() {
    super();
    this.serverName = "Authentication";
    this.socket = io(`http://localhost:${config.gateway.port}`);
  }
  private sockets() {
    // Socket declarations for the authentication service go here
    this.socket.on("connect", () =>
      this.socket.emit("service_connected", this.serverName)
    );
  }
  public startService() {
    // tslint:disable-next-line: member-ordering
    connectDB();
    this.start(config.server.port, config.environment);
    this.sockets();
  }
}

const server = new AuthService();

server.startService();

export default server;
