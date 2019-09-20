import { expect } from "chai";
import checkPorts from "../utils/checkPorts";
import apiCaller from "../utils/apiCaller";
import getToken from "../utils/getToken";
import server from "../index";

let token;

const testAccount = {
  email: "test@user.com",
  password: "test1234"
};

const testMember = {
  name: "Testmember",
  class: "Druid",
  region: "EU",
  realm: "Sylvanas"
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

beforeEach(
  async () => (token = await getToken(testAccount.email, testAccount.password))
);

describe("Guild Service", () => {
  describe("Create Guild", () => {
    it("should should return the guild name, realm, region, roles, members and the other metadata", async () => {
      const res = await apiCaller(
        "guild",
        "post",
        "/create-guild",
        {
          name: "Test Guild"
        },
        token
      );
      expect(res.status).to.eq(200);
      expect(res.data).to.include.all.keys(
        "name",
        "realm",
        "region",
        "roles",
        "faction",
        "members",
        "createdAt",
        "_id",
        "__v"
      );
    });
  });
  describe("Add Member", () => {
    it("should return the member list of the guild", async () => {});
  });
});

after(() => {
  server.stop();
});
