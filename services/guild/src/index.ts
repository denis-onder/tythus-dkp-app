import Server from "./Server";
import config from "./config";
import connectDB from "./config/database";
import ISocketInterface from "./interfaces/ISocketInterface";

class GuildService extends Server {
  constructor() {
    super();
    this.serverName = "Guild";
  }
  private sockets() {
    console.log("Sockets established!");
    this.io.on("connection", (socket: ISocketInterface) => {
      // Socket declarations for the guild service go here
    });
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
