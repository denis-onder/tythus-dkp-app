import { Application, Request, Response } from "express";
import Controller from "./Controller";
import validateInput from "./middleware/validateInput";
import validateToken from "./middleware/validateToken";

class Router {
  public initialize(app: Application) {
    app.post("/register", validateInput, (req: Request, res: Response) =>
      Controller.register(req, res)
    );
    app.post("/login", validateInput, (req: Request, res: Response) =>
      Controller.login(req, res)
    );
    app.put(
      "/edit",
      validateToken,
      validateInput,
      (req: Request, res: Response) => Controller.edit(req, res)
    );
    app.delete("/delete", validateToken, (req: Request, res: Response) =>
      Controller.delete(req, res)
    );
    app.post("/find", (req: Request, res: Response) =>
      Controller.findUserViaID(req, res)
    );
  }
}

export default new Router();
