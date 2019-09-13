import { expect } from "chai";
import checkPorts from "../utils/checkPorts";
import testApiCaller from "../utils/testApiCaller";
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
      expect(2 + 2).to.eq(4);
    });
  });
});

after(() => {
  server.stop();
});
