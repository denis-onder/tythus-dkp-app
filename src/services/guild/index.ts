import Server from "../../Server";
import config from "../../config";

new Server().start(config.guild.server.port, config.guild.environment);
