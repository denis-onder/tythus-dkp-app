import User from "./models/User.model";
import bcrypt from "bcrypt";
import config from "./config";
import { Request, Response } from "express";

class Controller {
  /**
   * Register a new user
   */
  public async register(req: Request, res: Response) {
    try {
      // Check if an user exists
      const user = User.findOne({ name: req.body.name });
      // If the user does not exist, send out a 404
      if (!user) {
        return res
          .status(404)
          .json({ error: `User ${req.body.name} does not exist.` });
      }
      // If there is no user, hash the provided password and save the user
      await new User({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, `${config.secretOrKey}`)
      })
        .save()
        // tslint:disable-next-line: no-shadowed-variable
        .then(user => console.log(user));
    } catch (error) {
      res.status(500).json(error);
    }
  }
  /**
   * Log an existing user in
   */
  public login() {}
  /**
   * Edit an existing user
   */
  public edit() {}
  /**
   * Delete an existing user
   */
  public delete() {}
}
