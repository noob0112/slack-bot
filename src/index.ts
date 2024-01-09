import express, { Request, Response } from "express";

import route from "#routes";
import { changeTimeZone } from "#utils/date"

process.env.TZ = "Utc"

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3001;

route(app)


app.listen(port, () => {
  const currentDateTime = new Date()
  currentDateTime.setDate(5)
  currentDateTime.setHours(9)
  currentDateTime.setMinutes(20)
  console.log(currentDateTime.getTime())
  console.log(new Date('2024-01-05 06:46:20'));
  console.log(new Date(currentDateTime.toLocaleString('en-US', {
    timeZone: "Asia/Ho_Chi_Minh",
  })));

  console.log(changeTimeZone(currentDateTime, "Asia/Ho_Chi_Minh"))
  console.log(`Server running at http://localhost:${port}`);
});
