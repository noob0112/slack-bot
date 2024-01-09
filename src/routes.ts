import { Express } from "express";
import wikiRouter from "#modules/wiki";
import cronMusicRouter from "#crons/music"

export default function route(app: Express) {
  app.use("/wiki", wikiRouter);
  app.use("/crons/music", cronMusicRouter);
}
