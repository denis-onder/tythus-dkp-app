import Server from "./Server";
import config from "./config";
import ISocketInterface from "./interfaces/ISocketInterface";

class Gateway extends Server {
  constructor() {
    super();
    this.serverName = "Gateway";
  }
  private sockets() {
    console.log("Sockets established!");
    this.io.on("connection", (socket: ISocketInterface) => {
      // Socket declarations for the gateway go here
      socket.on("service_connected", name =>
        console.log(`${name} service connected to the gateway.`)
      );
    });
  }
  public startService() {
    this.start(config.server.port, config.environment);
    this.sockets();
  }
}

new Gateway().startService();
