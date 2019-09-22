import { Application, Request, Response } from "express";
import Controller from "./Controller";
import validateInput from "./middleware/validateInput";
import validateToken from "./middleware/validateToken";
import checkForUser from "./middleware/checkForUser";
import IRequest from "./interfaces/IRequest";

class Router {
    public initialize(app: Application) {
        app.post(
            "/register",
            validateInput,
            checkForUser,
            (req: Request, res: Response) => Controller.register(req, res)
        );
        app.post("/login", validateInput, (req: Request, res: Response) =>
            Controller.login(req, res)
        );
        app.put(
            "/edit",
            validateToken,
            validateInput,
            (req: IRequest, res: Response) => Controller.edit(req, res)
        );
        app.delete("/delete", validateToken, (req: IRequest, res: Response) =>
            Controller.delete(req, res)
        );
        app.post("/find-id", (req: Request, res: Response) =>
            Controller.findUserViaID(req, res)
        );
        app.post("/find-name", (req: Request, res: Response) =>
            Controller.findUserViaName(req, res)
        );
        app.post("/find-email", (req: Request, res: Response) =>
            Controller.findUserViaEmail(req, res)
        );
    }
}

export default new Router();
