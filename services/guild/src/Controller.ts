import { Request, Response } from "express";
import Guild from "./models/Guild.model";

class Controller {
  /**
   * Create a new guild
   */
  public async createGuild(req: any, res: Response) {
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
      console.log(newGuild);
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
  public addMember(req: Request, res: Response) {}
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
