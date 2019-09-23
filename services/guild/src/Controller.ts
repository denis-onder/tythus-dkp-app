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
            // Check if the user exists
            const response = await apiCaller("auth", "post", "/find-email", {
                email: req.body.email
            });
            if (response.status !== 200) {
                return res.status(404).json(response.data);
            }
            const user = response.data;
            // Check if the region, faction and realm match with between the guild and the user
            if (user.region !== guild.region) {
                return res.status(403).json({
                    error: "Region mismatch between the user and the guild."
                });
            }
            if (user.realm !== guild.realm) {
                return res.status(403).json({
                    error: "Realm mismatch between the user and the guild."
                });
            }
            if (user.faction !== guild.faction) {
                return res.status(403).json({
                    error: "Faction mismatch between the user and the guild."
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
                    if (guilds[i].members[j].name === user.username) {
                        // Return an error message if themember is within a guild
                        return res.status(403).json({
                            error: `User ${user.username} is already in a guild.`
                        });
                    }
                }
            }
            //  Add the new guild member
            guild.members.push({
                name: user.username,
                role: guild.roles[guild.roles.length - 1],
                class: user.class
            });
            await guild.save();
            console.log(
                `${user.username} added to ${guild.name} - ${guild.region} ${guild.realm}`
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
            // Check if the guild exists
            const guild: any = await Guild.findById(req.body.guild_id);
            if (!guild) {
                return res.status(404).json({ error: "Guild not found." });
            }
            // Check if the user is a part of the guild
            const isInGuild = await guild.members.some(member => {
                member._id === req.body.user_id;
            });
            console.log(isInGuild);
            if (!isInGuild) {
                return res.status(404).json({
                    error: `${req.body.user_id} is not in the guild.`
                });
            }
            /* testing */ return res
                .status(200)
                .json(`User ${req.body.user_name} found in guild.`);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    /**
     * Modify DKP values of a member
     */
    public modDKP(req: Request, res: Response) {}
    /**
     * Remove an existing member
     */
    public removeMember(req: Request, res: Response) {}
}

export default new Controller();
