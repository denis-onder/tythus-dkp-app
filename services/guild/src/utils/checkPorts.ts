import tcpPortUsed from "tcp-port-used";
import config from "../config";

export default callback => {
  tcpPortUsed
    .check(config.server.port, "127.0.0.1")
    .then(inUse =>
      inUse
        ? callback(true, `Port ${config.server.port} is in use.`)
        : callback(false, null)
    )
    .catch(err => callback(true, err));
};
