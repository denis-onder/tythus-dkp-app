import { assert, expect } from "chai";
import checkPorts from "../utils/checkPorts";
import testApiCaller from "../utils/testApiCaller";
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

describe("Test suite", () => {
  it("should return that 2 + 2 equals 4", () => {
    expect(2 + 2).to.eq(4);
  });
});

after(() => {
  server.stop();
});
