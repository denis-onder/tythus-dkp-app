import { Request, Response } from "express";
import Guild from "./models/Guild.model";
import IRequest from "./interfaces/IRequest";
class Controller {
  /**
   * Create a new guild
   */
  public async createGuild(req: IRequest, res: Response) {
    try {
      // Check if a guild exists on the same realm with the same name
      const guild = await Guild.findOne({
        realm: req.user.realm,
        name: req.body.name
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
        members: [
          {
            name: req.user.username,
            role: "Guild Master",
            class: req.user.class
          }
        ]
      });
      await newGuild.save();
      console.log(`${newGuild.name} - ${newGuild.realm} has been created!`);
      return res.status(200).json(newGuild);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Add a new member
   */
  public async addMember(req: Request, res: Response) {
    // Check if the member is already in another guild
    const guilds: any = await Guild.find({ region: req.body.user_region });
    for (let i = 0; i < guilds.length; i++) {
      for (let j = 0; j < guilds[i].members.length; j++) {
        if (guilds[i].members[j].name === req.body.user_name) {
          return res.status(403).json({
            error: `User ${req.body.user_name} is already in a guild.`
          });
        }
      }
    }
  }
  /**
   * Change member role
   */
  public changeRole(req: Request, res: Response) {}
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
