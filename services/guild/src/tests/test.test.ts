import { expect } from "chai";
import checkPorts from "../utils/checkPorts";
import apiCaller from "../utils/apiCaller";
import getToken from "../utils/getToken";
import server from "../index";

before(() => {
  checkPorts((err, data) => {
    if (err) {
      console.log("Starting up the server...");
      return;
    }
    server.startService();
  });
});

describe("Guild Service", () => {
  describe("Test", () => {
    it("should return 4", async () => {
      const res = await apiCaller("auth", "get", "/find", {
        user_id: "5d7c1439a42f7d336477f67f"
      });
      expect(res.status).to.eq(200);
      expect(res.data).to.include.all.keys("id", "username", "email");
    });
  });
});

after(() => {
  server.stop();
});
