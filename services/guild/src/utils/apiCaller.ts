import axios from "axios";
import config from "../config";

export default async (service, method, endpoint, data = null, token = "") => {
  try {
    let port = 0;
    if (config.environment !== "development") {
      port += 1000;
    }
    switch (service) {
      case "auth":
        port += 8001;
        break;
      case "guild":
        port += 8002;
        break;
      case "gateway":
        port += 8000;
        break;
    }
    // tslint:disable-next-line: no-string-literal
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios[method](
      `http://localhost:${port}${endpoint}`,
      data
    );
    return {
      status: res.status,
      data: res.data
    };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
