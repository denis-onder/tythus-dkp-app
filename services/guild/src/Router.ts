import { Application, Request, Response } from "express";
import Controller from "./Controller";
import validateToken from "./middleware/validateToken";
import IRequest from "./interfaces/IRequest";
import validateInput from "./middleware/validateInput";
// import validateInput from "./middleware/validateInput";

class Router {
    public initialize(app: Application) {
        app.post(
            "/create-guild",
            validateToken,
            validateInput,
            (req: IRequest, res: Response) => Controller.createGuild(req, res)
        );
        app.post("/add-member", validateToken, (req: IRequest, res: Response) =>
            Controller.addMember(req, res)
        );
        app.delete(
            "/remove-member",
            validateToken,
            (req: Request, res: Response) => Controller.removeMember(req, res)
        );
        app.put("/dkp", validateToken, (req: Request, res: Response) =>
            Controller.modDKP(req, res)
        );
        app.put("/role", validateToken, (req: Request, res: Response) =>
            Controller.changeRole(req, res)
        );
    }
}

export default new Router();
