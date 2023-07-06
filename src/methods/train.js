import Bot from "../models/Bot";
import { CronJob } from "cron";
import Response from "../models/Response";
import ApiKey from "../models/ApiKey";
import os from "os";
async function train(client, bot) {
  const responses = await Response.find();
  const key = await ApiKey.find();
  bot = await bot;
  let interval = key[0].time.interval;
  async function chat() {
    const checkBot = await Bot.findOne({ phone: bot.phone });
    if (!checkBot.t_active) return;
    if (checkBot.host !== os.hostname())
      throw Error(
        "Se frenó la ejecución de entrenamiento por número repetido en distintas máquinas"
      );
    try {
      const foundKey = await ApiKey.find();
      const time = foundKey[0].time;
      const intervals = [0, 1, 2, 3, 0.5, -0.5];
      const lastDate = checkBot.lastDate;
      interval = intervals[Math.floor(Math.random() * interval.length)];
      const now = new Date().getHours();
      if (now > time.finish || now < time.start) return;
      const bots = await Bot.find({ t_active: true }).select('phone');
      const dm = bots[Math.floor(Math.random() * bots.length)];
      const recipients = [dm.phone, bot.group_id];
      const randomRecipient =
        recipients[Math.floor(Math.random() * recipients.length)];
      await client.sendMessage(
        randomRecipient.group_id,
        responses[Math.floor(Math.random() * responses.length)].content
      );
      const today = new Date().getUTCDate();
      if (today !== lastDate) {
        bot.days += 1;
        bot.lastDate = today;
        await bot.save();
      }
      console.log("Mensaje enviado");
    } catch (e) {
      console.log("Ha ocurrido un error inesperado:", e);
    }
  }
  chat();
  const job = new CronJob(
    `*/${interval} * * * *`,
    chat,
    null,
    true,
    "America/Bogota"
  );
  job.start();
}

export default train;
