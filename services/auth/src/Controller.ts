import User from "./models/User.model";
import { hashSync, compareSync } from "bcrypt";
import config from "./config";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import IRequest from "./interfaces/IRequest";

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
        class: req.body.class,
        region: req.body.region,
        realm: req.body.realm,
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
        email: user.email,
        class: user.class,
        realm: user.realm,
        region: user.region
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
  public async edit(req: IRequest, res: Response) {
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
      user.class = req.body.class;
      user.realm = req.body.realm;
      user.region = req.body.region;
      user.password = hashSync(req.body.password, 10);
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Delete an existing user
   */
  public async delete(req: IRequest, res: Response) {
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
  public async findUserViaID(req: Request, res: Response) {
    // Check if an user exists
    const user: any = await User.findById(req.body.user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      class: user.class,
      realm: user.realm,
      region: user.region
    });
  }
  /**
   * Find an user via name
   */
  public async findUserViaName(req: Request, res: Response) {
    const user: any = await User.findOne({ username: req.body.user_name });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      class: user.class,
      realm: user.realm,
      region: user.region
    });
  }
}

export default new Controller();
