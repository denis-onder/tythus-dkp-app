import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import apiCaller from "../utils/apiCaller";
import config from "../config";

export default (req: any, res: Response, next: NextFunction) => {
  const token = req.get("Authorization").replace("Bearer ", "");
  jwt.verify(token, config.secretOrKey, async (error, payload) => {
    if (error) {
      error.unauthorized = true;
      return res.status(401).json({ error });
    }
    const user = await apiCaller("auth", "get", "/find", {
      user_id: payload.id
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    req.user = user;
    next();
  });
};
