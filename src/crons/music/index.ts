import express, { Request, Response } from "express";

import { channel, bot, user } from "#constants";
import slackWebApi from "#helpers/slack-web-api";
import { sleep } from "#utils";

const router = express.Router();

const musicBotScheduler = {
  hour: 9,
  minute: 20,
  second: 0,
  milliseconds: 0,
};

const youtubeMusicUrl = ""

router.get("/", async (req: Request, res: Response) => {
  const currentDateTime = new Date();
  const musciBotScheduleAt = caculateMusicBotSendMessage();

  if (currentDateTime.getTime() < musciBotScheduleAt.getTime()) {
    return res.status(400).send({ message: "Music Bot chưa tạo thread" });
  }

  let conversationHistory: any[] = [];
  let lastestMusicBotConversation;
  let todayMusicBotThread: any = {};
  let isMusicBotCreatedThread = false;

  // while (!isMusicBotCreatedThread) {
  try {
    const result = await slackWebApi.conversations.history({
      channel: channel.thachDauHoiChannelId,
    });

    conversationHistory = result.messages || [];
  } catch (error) {
    console.error(error);
  }

  const musicBotConversations = conversationHistory?.filter(
    ({ bot_id }) => bot_id === bot.music
  );
  lastestMusicBotConversation = musicBotConversations[0];
  const lastestMusicBotConversationCreatedAt =
    lastestMusicBotConversation.ts * 1000;

  if (lastestMusicBotConversationCreatedAt > musciBotScheduleAt.getTime()) {
    todayMusicBotThread = lastestMusicBotConversation;
    isMusicBotCreatedThread = true;
  } else {
    await sleep(1000);
  }
  // }

  if (
    !todayMusicBotThread ||
    !todayMusicBotThread?.reply_users ||
    Array.isArray(todayMusicBotThread.reply_users)
  ) {
    return res.status(500);
  }

  if (
    todayMusicBotThread.reply_users.length &&
    todayMusicBotThread.reply_users.includes(user["nguyen.viet.hoang03"])
  ) {
    return res.status(400).send({ message: "Người dùng đã order nhạc" });
  }

  await slackWebApi.chat.postMessage({
    channel: channel.thachDauHoiChannelId,
    as_user: true,
    text: youtubeMusicUrl,
  })

  return res.send(lastestMusicBotConversation);
});

function caculateMusicBotSendMessage() {
  const currentDateTime = new Date();
  currentDateTime.setHours(musicBotScheduler.hour);
  currentDateTime.setMinutes(musicBotScheduler.minute);
  currentDateTime.setSeconds(musicBotScheduler.second);
  currentDateTime.setMilliseconds(musicBotScheduler.milliseconds);

  return currentDateTime;
}

export default router;
