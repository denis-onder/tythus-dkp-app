import Server from "../../Server";
import config from "./config";
import ISocketInterface from "../../interfaces/ISocketInterface";

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
    this.start(config.server.port, config.environment);
    this.sockets();
  }
}

export default new GuildService();
