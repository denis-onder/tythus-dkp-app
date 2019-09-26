import Server from "./Server";
import config from "./config";
import connectDB from "./config/database";
import io from "socket.io-client";

class GuildService extends Server {
  constructor() {
    super();
    this.serverName = "Guild";
    this.socket = io(`http://localhost:${config.gateway.port}`);
  }
  private sockets() {
    // Socket declarations for the guild service go here
    this.socket.on("connect", () =>
      this.socket.emit("service_connected", this.serverName)
    );
  }
  public startService() {
    connectDB();
    this.start(config.server.port, config.environment);
    this.sockets();
  }
}

const server = new GuildService();

server.startService();

export default server;
