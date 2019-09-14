import User from "./models/User.model";
import { hashSync, compareSync } from "bcrypt";
import config from "./config";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

class Controller {
  /**
   * Register a new user
   */
  public async register(req: Request, res: Response) {
    try {
      // Check if an user exists
      const user = await User.findOne({ email: req.body.email });
      // If the user does exist, send out a 403
      if (user) {
        return res
          .status(403)
          .json({ error: `Email ${req.body.email} is already in use.` });
      }
      // If there is no user, hash the provided password and save the user
      const newUser: any = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashSync(req.body.password, 10)
      });
      await newUser.save();
      res.status(200).json(newUser);
      console.log(`User ${newUser.username} has registered.`);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
  /**
   * Log an existing user in
   */
  public async login(req: Request, res: Response) {
    try {
      // Check if an user exists
      const user: any = await User.findOne({ email: req.body.email });
      // If the user does not exist, send out a 404
      if (!user) {
        return res
          .status(404)
          .json({ error: `Email ${req.body.email} is not in use.` });
      }
      // Compare passwords
      const match = await compareSync(req.body.password, user.password);
      // If the passwords are not matching, send out a 401
      if (!match) {
        return res.status(401).json({ error: "The password is not correct." });
      }
      // Send out an authorization token with the necessary payload
      const payload = {
        id: user._id,
        email: user.email
      };
      jwt.sign(
        payload,
        config.secretOrKey,
        { expiresIn: 86400 },
        (err, token) => {
          // If an error occurs during signing the token, send it out
          if (err) {
            return res.status(500).json(err);
          }
          res.status(200).json({
            loggedIn: true,
            token: `Bearer ${token}`
          });
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  }
  /**
   * Edit an existing user
   */
  public async edit(req: any, res: Response) {
    try {
      // Check if an user exists
      const user: any = await User.findById(req.user.id);
      // If there's no user, send out a 404
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      // Modify the document, save it and return it to the user
      user.username = req.body.username;
      user.email = req.body.email;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Delete an existing user
   */
  public async delete(req: any, res: Response) {
    // Check if an user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await user.remove();
    res.status(200).json({ deleted: true, timestamp: Date.now() });
  }
  /**
   * Find an user via ID
   */
  public async findUserViaID(req: any, res: Response) {
    // Check if an user exists
    const user: any = await User.findById(req.body.user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res
      .status(200)
      .json({ id: user._id, username: user.username, email: user.email });
  }
}

export default new Controller();
