import { Express } from "express";
import musicRouter from "#modules/music/infras/endpoints/http/crons"

export default function route(app: Express) {
  app.use("/music/cron", musicRouter);
}
