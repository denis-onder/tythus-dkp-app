import Server from "../../Server";
import config from "../../config";

new Server().start(config.auth.server.port, config.auth.environment);
