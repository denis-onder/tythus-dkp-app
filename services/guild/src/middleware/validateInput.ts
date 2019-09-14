import inputValidator from "../utils/inputValidator";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const inputErrors = inputValidator[req.path.replace("/", "")](req.body);
  inputErrors ? res.status(500).json(inputErrors) : next();
};
