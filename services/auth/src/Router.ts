import { Application, Request, Response } from "express";
import Controller from "./Controller";

class Router {
  public initialize(app: Application) {
    app.post("/register", (req: Request, res: Response) =>
      Controller.register(req, res)
    );
    app.post("/login", (req: Request, res: Response) =>
      Controller.login(req, res)
    );
    // app.put('/edit', (req: Request, res: Response) => Controller.edit(req, res))
    // app.delete('/delete', (req: Request, res: Response) => Controller.delete(req, res))
  }
}

export default new Router();
