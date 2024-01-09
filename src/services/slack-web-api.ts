import { WebClient, LogLevel } from "@slack/web-api";

export default new WebClient(process.env.SLACK_USER_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.ERROR,
});
