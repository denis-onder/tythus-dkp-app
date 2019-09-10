import axios from "axios";
import config from "../config";

export default async (method, endpoint, data = null, token = "") => {
  try {
    // tslint:disable-next-line: no-string-literal
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios[method](
      `http://localhost:${config.server.port}${endpoint}`,
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
