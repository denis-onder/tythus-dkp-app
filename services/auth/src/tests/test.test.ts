import { expect } from "chai";
import checkPorts from "../utils/checkPorts";
import testApiCaller from "../utils/testApiCaller";
import getToken from "../utils/getToken";
import server from "../index";
import ITestingAccountInterface from "../interfaces/ITestingAccountInterface";

const testingAccount: ITestingAccountInterface = {
  username: "testing_account",
  password: "test1234",
  confirmPassword: "test1234",
  email: "testing@account.com",
  class: "Warrior",
  realm: "Sylvanas",
  region: "EU",
  faction: "Horde"
};

const editedTestingAccount = {
  username: "edited_testing_account",
  email: "edited@account.com",
  password: "1234test",
  class: "Hunter",
  realm: "Golemagg",
  region: "US",
  faction: "Alliance"
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
    it("should return the username, password, email, class, realm, region, faction, time of creation and ID", async () => {
      const res = await testApiCaller("post", "/register", testingAccount);
      expect(res.status).to.eq(200);
      expect(res.data).to.include.all.keys(
        "username",
        "password",
        "email",
        "class",
        "realm",
        "region",
        "createdAt",
        "faction",
        "_id",
        "__v"
      );
    });
  });
  describe("Login", () => {
    it("should return an object with the loggedIn and token props", async () => {
      const res = await testApiCaller("post", "/login", testingAccount);
      expect(res.status).to.eq(200);
      expect(res.data).to.include.all.keys("loggedIn", "token");
    });
  });
  describe("Edit", () => {
    it("should return the username, password, email, class, realm, region, faction, time of creation and ID", async () => {
      const token = await getToken(
        testingAccount.email,
        testingAccount.password
      );
      const res = await testApiCaller(
        "put",
        "/edit",
        editedTestingAccount,
        token
      );
      expect(res.status).to.eq(200);
      expect(res.data).to.include.all.keys(
        "username",
        "password",
        "email",
        "class",
        "realm",
        "region",
        "faction",
        "createdAt",
        "_id",
        "__v"
      );
    });
  });
  describe("Delete", () => {
    it("should return an object with the deleted prop and a timestamp", async () => {
      const token = await getToken(
        editedTestingAccount.email,
        editedTestingAccount.password
      );
      const res = await testApiCaller("delete", "/delete", null, token);
      expect(res.status).to.eq(200);
      expect(res.data).to.include.all.keys("deleted", "timestamp");
    });
  });
});

after(() => {
  server.stop();
});
