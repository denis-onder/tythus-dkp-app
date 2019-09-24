import { expect } from "chai";
import checkPorts from "../utils/checkPorts";
import apiCaller from "../utils/apiCaller";
import getToken from "../utils/getToken";
import server from "../index";

let token;
let guild_id;
let member_id;

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
            // Register the new member
            await apiCaller("auth", "post", "/register", newMember);
            const res = await apiCaller("guild", "post", "/add-member", {
                guild_id,
                email: newMember.email
            });
            member_id = res.data[1]._id;
            expect(res.status).to.eq(200);
            expect(res.data).to.be.an("array");
        });
    });
    describe("Change Role", () => {
        it("should return the member list of the guild", async () => {
            const res = await apiCaller(
                "guild",
                "put",
                "/role",
                {
                    guild_id,
                    member_id
                },
                token
            );
            expect(res.status).to.eq(200);
            expect(res.data).to.be.an("array");
        });
    });
    describe("DKP", () => {
        it("should return the member list of the guild", async () => {
            const res = await apiCaller(
                "guild",
                "put",
                "/dkp",
                { guild_id, member_id, dkp: 50 },
                token
            );
            expect(res.status).to.eq(200);
            expect(res.data).to.be.an("array");
        });
    });
    describe("Remove member", () => {
        it("should return the member list of the guild", async () => {
            const res = await apiCaller(
                "guild",
                "delete",
                "/remove-member",
                {
                    guild_id,
                    member_id
                },
                token
            );
            // Remove the user
            const newMemberToken = await getToken(
                newMember.email,
                newMember.password
            );
            await apiCaller("auth", "delete", "/delete", null, newMemberToken);
            expect(res.status).to.eq(200);
            expect(res.data).to.be.an("array");
        });
    });
    describe("Remove guild", () => {
        it("should return an object with the deleted and timestamp keys", async () => {
            const res = await apiCaller(
                "guild",
                "delete",
                "/remove-guild",
                {
                    guild_id,
                    member_id
                },
                token
            );
            expect(res.status).to.eq(200);
            expect(res.data).to.include.all.keys("deleted", "timestamp");
        });
    });
});

after(() => {
    server.stop();
});
