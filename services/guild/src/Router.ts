import { Application, Response } from "express";
import Controller from "./Controller";
import validateToken from "./middleware/validateToken";
import IRequest from "./interfaces/IRequest";

class Router {
  public initialize(app: Application) {
    app.post("/create-guild", validateToken, (req: IRequest, res: Response) =>
      Controller.createGuild(req, res)
    );
    app.post("/add-member", validateToken, (req: IRequest, res: Response) =>
      Controller.addMember(req, res)
    );
    app.delete(
      "/remove-member",
      validateToken,
      (req: IRequest, res: Response) => Controller.removeMember(req, res)
    );
    app.put("/dkp", validateToken, (req: IRequest, res: Response) =>
      Controller.modDKP(req, res)
    );
    app.put("/role", validateToken, (req: IRequest, res: Response) =>
      Controller.changeRole(req, res)
    );
    app.delete("/remove-guild", validateToken, (req: IRequest, res: Response) =>
      Controller.removeGuild(req, res)
    );
    app.delete(
      "/remove-member",
      validateToken,
      (req: IRequest, res: Response) => Controller.removeMember(req, res)
    );
  }
}

export default new Router();
