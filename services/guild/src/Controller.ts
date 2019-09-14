import { Request, Response } from "express";
import Guild from "./models/Guild.model";
import axios from "axios";

class Controller {
  /**
   * Create a new guild
   */
  public async createGuild(req: Request, res: Response) {
    try {
      // Check if a guild exists on the same realm with the same name
      const guild = await Guild.findOne({
        realm: req.body.realm,
        name: req.body.name
      });
      // If a guild already exists, send out an error
      if (guild) {
        return res.status(403).json({
          error: `${req.body.name} - ${req.body.realm} already exists.`
        });
      }
      // Else, create a new guild
      const newGuild: any = new Guild({
        name: req.body.name,
        realm: req.body.realm,
        roles: ["Guild Master", ...req.body.roles],
        members: [...req.body.members]
      });
      await newGuild.save();
      return res.status(200).json(newGuild);
      console.log(`${newGuild.name} - ${newGuild.realm} has been created!`);
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
