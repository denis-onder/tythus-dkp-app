import { expect } from "chai";
import checkPorts from "../utils/checkPorts";
import apiCaller from "../utils/apiCaller";
import getToken from "../utils/getToken";
import server from "../index";

const testAccount = {
  email: "test@user.com",
  password: "test1234"
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

describe("Guild Service", () => {
  describe("Create Guild", () => {
    it("should should return the guild name, realm, region, roles, members and the other metadata", async () => {
      const token = await getToken(testAccount.email, testAccount.password);
      const res = await apiCaller(
        "guild",
        "post",
        "/create-guild",
        {
          name: "Test Guild",
          realm: "Sylvanas",
          region: "EU"
        },
        token
      );
      expect(res.status).to.eq(200);
      expect(res.data).to.include.all.keys(
        "name",
        "realm",
        "region",
        "roles",
        "members",
        "createdAt",
        "_id",
        "__v"
      );
    });
  });
});

after(() => {
  server.stop();
});
