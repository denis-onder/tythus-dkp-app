import { Request, Response, NextFunction } from "express";
import apiCaller from "../utils/apiCaller";

export default async (req: Request, res: Response, next: NextFunction) => {
    const user = await apiCaller("auth", "post", "/find-name", {
        username: req.body.username,
        region: req.body.region,
        realm: req.body.realm,
        faction: req.body.faction
    });
    if (user) {
        return res.status(403).json({
            error:
                "A user already exists with that name on the selected realm/region."
        });
    }
    next();
};
