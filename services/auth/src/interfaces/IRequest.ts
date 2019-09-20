import { Request } from "express";

export default interface IRequest extends Request {
  user: {
    id: string;
    username: string;
    realm: string;
    class: string;
    region: string;
    faction: string;
  };
}
