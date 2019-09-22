import { expect } from "chai";
import checkPorts from "../utils/checkPorts";
import apiCaller from "../utils/apiCaller";
import getToken from "../utils/getToken";
import server from "../index";

let token;
let guild_id;

const testAccount = {
    email: "test@user.com",
    password: "test1234"
};

const newMember = {
    username: "Newmember",
    password: "test1234",
    confirmPassword: "test1234",
    email: "new@member.com",
    class: "Druid",
    region: "EU",
    faction: "Horde",
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
    async () =>
        (token = await getToken(testAccount.email, testAccount.password))
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
            guild_id = res.data._id;
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
        it("should return the member list of the guild", async () => {
            await apiCaller("auth", "post", "/register", newMember);
            const res = await apiCaller("guild", "post", "/add-member", {
                guild_id,
                email: newMember.email
            });
            expect(res.status).to.eq(200);
            expect(res.data)
                .to.be.an("array")
                .that.includes.any.keys("DKP, _id, name, role, class");
        });
    });
});

after(() => {
    server.stop();
});
