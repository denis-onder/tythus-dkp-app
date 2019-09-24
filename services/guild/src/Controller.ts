import { Request, Response } from "express";
import Guild from "./models/Guild.model";
import IRequest from "./interfaces/IRequest";
import apiCaller from "./utils/apiCaller";

class Controller {
    /**
     * Create a new guild
     */
    public async createGuild(req: IRequest, res: Response) {
        try {
            // Check if a guild exists on the same realm with the same name
            const guild = await Guild.findOne({
                realm: req.user.realm,
                name: req.body.name,
                faction: req.user.faction
            });
            // If a guild already exists, send out an error
            if (guild) {
                return res.status(403).json({
                    error: `${req.body.name} - ${req.user.realm} already exists.`
                });
            }
            // Else, create a new guild
            const newGuild: any = new Guild({
                name: req.body.name,
                realm: req.user.realm,
                region: req.user.region,
                faction: req.user.faction,
                members: [
                    {
                        name: req.user.username,
                        role: "Guild Master",
                        class: req.user.class
                    }
                ]
            });
            await newGuild.save();
            console.log(
                `${newGuild.faction}: ${newGuild.name} - ${newGuild.realm} has been created!`
            );
            return res.status(200).json(newGuild);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    /**
     * Add a new member
     */
    public async addMember(req: IRequest, res: Response) {
        try {
            // Check if the guild exists
            const guild: any = await Guild.findById(req.body.guild_id);
            if (!guild) {
                return res.status(404).json({ error: "Guild not found." });
            }
            // Check if the member exists
            const response = await apiCaller("auth", "post", "/find-email", {
                email: req.body.email
            });
            if (response.status !== 200) {
                return res.status(404).json(response.data);
            }
            const member = response.data;
            // Check if the region, faction and realm match with between the guild and the member
            if (member.region !== guild.region) {
                return res.status(403).json({
                    error: "Region mismatch between the member and the guild."
                });
            }
            if (member.realm !== guild.realm) {
                return res.status(403).json({
                    error: "Realm mismatch between the member and the guild."
                });
            }
            if (member.faction !== guild.faction) {
                return res.status(403).json({
                    error: "Faction mismatch between the member and the guild."
                });
            }
            // Check if the member is already in another guild
            const guilds: any = await Guild.find({
                region: guild.region,
                faction: guild.faction
            });
            // Loop over all guilds of the matching region and faction
            for (let i = 0; i < guilds.length; i++) {
                // Loop over the members of the guild and check if the member is within the guild
                for (let j = 0; j < guilds[i].members.length; j++) {
                    if (guilds[i].members[j].name === member.username) {
                        // Return an error message if themember is within a guild
                        return res.status(403).json({
                            error: `${member.username} is already in a guild.`
                        });
                    }
                }
            }
            //  Add the new guild member
            guild.members.push({
                name: member.username,
                role: guild.roles[guild.roles.length - 1],
                class: member.class
            });
            await guild.save();
            console.log(
                `${member.username} added to ${guild.name} - ${guild.region} ${guild.realm}`
            );
            return res.status(200).json(guild.members);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    /**
     * Change member role
     */
    public async changeRole(req: Request, res: Response) {
        try {
            let memberIndex;
            // Check if the guild exists
            const guild: any = await Guild.findById(req.body.guild_id);
            if (!guild) {
                return res.status(404).json({ error: "Guild not found." });
            }
            // Check if the member is a part of the guild
            const isInGuild = await guild.members.find((member, index) => {
                memberIndex = index;
                return member._id == req.body.member_id;
            });
            if (!isInGuild) {
                return res.status(404).json({
                    error: `${req.body.member_id} is not in the guild.`
                });
            }
            // Check if the role is in the roles array of the guild
            if (!guild.roles.includes(req.body.role)) {
                return res.status(404).json({
                    error: `Role ${req.body.role} is not listed in the guild.`
                });
            }
            // If the member is in the guild, assign the new role
            guild.members[memberIndex].role = req.body.role;
            await guild.save();
            return res.status(200).json(guild.members);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    /**
     * Modify DKP values of a member
     */
    public async modDKP(req: Request, res: Response) {
        try {
            let memberIndex;
            // Check if the guild exists
            const guild: any = await Guild.findById(req.body.guild_id);
            if (!guild) {
                return res.status(404).json({ error: "Guild not found." });
            }
            // Check if the member is a part of the guild
            const isInGuild = await guild.members.find((member, index) => {
                memberIndex = index;
                return member._id == req.body.member_id;
            });
            if (!isInGuild) {
                return res.status(404).json({
                    error: `${req.body.member_id} is not in the guild.`
                });
            }
            // If the member in in the guild, assign the new DKP value
            guild.members[memberIndex].DKP = req.body.dkp;
            await guild.save();
            return res.status(200).json(guild.members);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    /**
     * Remove an existing member
     */
    public async removeMember(req: Request, res: Response) {
        try {
            let memberIndex;
            // Check if the guild exists
            const guild: any = await Guild.findById(req.body.guild_id);
            if (!guild) {
                return res.status(404).json({ error: "Guild not found." });
            }
            // Check if the member is a part of the guild
            const isInGuild = await guild.members.find((member, index) => {
                memberIndex = index;
                return member._id == req.body.member_id;
            });
            if (!isInGuild) {
                return res.status(404).json({
                    error: `${req.body.member_id} is not in the guild.`
                });
            }
            // If the member is in the guild, remove it
            guild.members.splice(memberIndex, 1);
            await guild.save();
            return res.status(200).json(guild.members);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    /**
     * Remove a guild
     */
    public async removeGuild(req: Request, res: Response) {
        try {
            // Check if a guild exists
            const guild = await Guild.findById(req.body.guild_id);
            // If the guild doesn't exist, send out an error
            if (!guild) {
                return res.status(404).json({ error: "Guild not found." });
            }
            // Else, remove it
            await guild.remove();
            res.status(200).json({ deleted: true, timestamp: Date.now() });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new Controller();
