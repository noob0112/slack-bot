import slackWebApi from "#helpers/slack-web-api";
import { channel } from "#constants";
import { MessageElement } from "@slack/web-api/dist/response/ConversationsHistoryResponse";

export interface IMusicService {
  getBookingMusicThread: () => Promise<MessageElement | null | undefined>;
}

class MusicService implements IMusicService {
  private readonly time = "16:20:00.000Z";

  public async getBookingMusicThread() {
    let conversationHistory;

    try {
      const result = await slackWebApi.conversations.history({
        channel: channel.thachDauHoiChannelId,
        limit: 10,
      });
      conversationHistory = result.messages?.[0];
    } catch (error) {
      console.error(error);
    }

    return conversationHistory;
  }
}
