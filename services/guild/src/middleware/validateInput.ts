import inputValidator from "../utils/inputValidator";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  let validationMethod;
  switch (req.path) {
    case "create-guild":
      validationMethod = "createGuild";
      break;
    case "add-member":
      validationMethod = "addMember";
      break;
  }
  const inputErrors = inputValidator[validationMethod](req.body);
  inputErrors ? res.status(500).json(inputErrors) : next();
};
