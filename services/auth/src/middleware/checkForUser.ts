import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User.model";

export default async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findOne({
        region: req.body.region,
        realm: req.body.realm,
        faction: req.body.faction,
        username: req.body.username
    });
    if (user) {
        return res.status(403).json({
            error:
                "A user already exists with that name on the selected realm/region."
        });
    }
    next();
};
