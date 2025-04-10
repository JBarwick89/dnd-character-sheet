import { Request } from "express";

export interface CharacterRequest extends Request {
  body: {
    name: string;
    playerName: string;
  };
}
