import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import apiCaller from "../utils/apiCaller";
import config from "../config";
import IRequest from "../interfaces/IRequest";

export default (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.get("Authorization").replace("Bearer ", "");
  jwt.verify(token, config.secretOrKey, async (error: any, payload: any) => {
    if (error) {
      error.unauthorized = true;
      return res.status(401).json({ error });
    }
    const user = await apiCaller("auth", "post", "/find-id", {
      user_id: payload.id
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // TODO: Implement expiration check
    req.user = user.data;
    next();
  });
};
