import { Request, Response } from "express";

export default class MusicsController {
  public async createMusicCron(req: Request, res: Response) {
    let conversationHistory;

    return res.send(conversationHistory);
  }
}
