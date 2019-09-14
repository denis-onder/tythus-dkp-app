import { Application, Request, Response } from "express";
import Controller from "./Controller";
import validateToken from "./middleware/validateToken";
import validateInput from "./middleware/validateInput";

// TODO: Write and implement a JWT verification middleware
class Router {
  public initialize(app: Application) {
    app.post(
      "/create-guild",
      validateToken,
      validateInput,
      (req: Request, res: Response) => Controller.createGuild(req, res)
    );
    app.post("/add-member", (req: Request, res: Response) =>
      Controller.addMember(req, res)
    );
    app.delete("/remove-member", (req: Request, res: Response) =>
      Controller.removeMember(req, res)
    );
    app.put("/dkp", (req: Request, res: Response) =>
      Controller.modDKP(req, res)
    );
    app.put("/role", (req: Request, res: Response) =>
      Controller.changeRole(req, res)
    );
  }
}

export default new Router();
