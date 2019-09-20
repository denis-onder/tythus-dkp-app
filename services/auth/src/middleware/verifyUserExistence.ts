import User from "../models/User.model";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  // Check if an user exists with the same name, on the same realm.
  const user = await User.findOne({
    username: req.body.username,
    realm: req.body.realm,
    region: req.body.region
  });
  // If an user exists, send out an error
  if (user) {
    return res.status(403).json({
      error: `User ${req.body.username} already exists on ${req.body.region} - ${req.body.realm}`
    });
  }
  // Else, proceed
  next();
};
