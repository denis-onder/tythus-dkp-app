import { Request, Response } from "express";
import Guild from "./models/Guild.model";
import axios from "axios";

class Controller {
  /**
   * Create a new guild
   */
  public createGuild(req: Request, res: Response) {}
  /**
   * Add a new member
   */
  public addMember(req: Request, res: Response) {
    axios
      .post("http://localhost:8001/find", {
        user_id: "5d7c1439a42f7d336477f67f"
      })
      .then(res => res.data)
      .then(data => res.json(data))
      .catch(err => res.json(err));
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
