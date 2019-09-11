import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import User from "../models/User.model";
import config from "../config";

export default (req: any, res: Response, next: NextFunction) => {
  const token = req.get("Authorization").replace("Bearer ", "");
  jwt.verify(token, config.secretOrKey, async (error, payload) => {
    if (error) {
      error.unauthorized = true;
      return res.status(401).json({ error });
    }
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    req.user = user;
    next();
  });
};
