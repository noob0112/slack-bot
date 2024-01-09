import express, { Request, Response } from "express";

import slackWebApi from "#helpers/slack-web-api";
import { channel } from "#constants";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  let conversationHistory;

  try {
    const result = await slackWebApi.conversations.history({
      channel: channel.thachDauHoiChannelId,
      limit: 1,
    });

    conversationHistory = result.messages || [];
  } catch (error) {
    console.error(error);
  }

  return res.send(conversationHistory);
});

export default router;
