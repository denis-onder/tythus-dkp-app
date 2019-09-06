import Server from "../../Server";
import config from "../../config";
import ISocketInterface from "../../interfaces/ISocketInterface";

class Gateway extends Server {
  constructor() {
    super();
  }
  private sockets() {
    console.log("Sockets established!");
    this.io.on("connection", (socket: ISocketInterface) => {
      // Socket declarations for the gateway go here
    });
  }
  public startService() {
    this.start(config.gateway.server.port, config.gateway.environment);
    this.sockets();
  }
}

export default new Gateway();
