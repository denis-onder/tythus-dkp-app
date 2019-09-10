import { assert, expect } from "chai";
import checkPorts from "../utils/checkPorts";
import testApiCaller from "../utils/testApiCaller";
import server from "../index";
import ITestingAccountInterface from "../interfaces/ITestingAccountInterface";

const testingAccount: ITestingAccountInterface = {
  username: "testing_account",
  password: "test1234",
  confirmPassword: "test1234",
  email: "testing@account.com"
};

before(() => {
  checkPorts((err, data) => {
    if (err) {
      console.log("Starting up the server...");
      return;
    }
    server.startService();
  });
});

describe("Authentication Service", () => {
  describe("Registration", () => {
    it("should return an object with the username, password, email, time of creation and ID", async () => {
      const res = await testApiCaller("post", "/register", testingAccount);
      expect(res.status).to.eq(200);
      expect(res.data).to.include.all.keys(
        "username",
        "password",
        "email",
        "_id",
        "__v"
      );
    });
  });
});

after(() => {
  server.stop();
});
