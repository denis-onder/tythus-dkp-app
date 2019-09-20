import { Request } from "express";

export default interface IRequest extends Request {
  user: {
    username: string;
    realm: string;
    class: string;
    region: string;
  };
}
