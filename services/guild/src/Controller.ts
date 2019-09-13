import { Request, Response } from "express";
import Guild from "./models/Guild.model";

class Controller {
  /**
   * Create a new guild
   */
  public createGuild(req: Request, res: Response) {}
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
