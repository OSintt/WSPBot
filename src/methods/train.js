import Bot from "../models/Bot";
import { CronJob } from "cron";
import Response from "../models/Response";
import ApiKey from "../models/ApiKey";

async function train(client, bot) {
  const responses = await Response.find();
  const key = await ApiKey.find();
  bot = await bot;
  let interval = key[0].time.interval;
  async function chat() {
    const checkBot = await Bot.findOne({ phone: bot.phone });
    if (!checkBot.t_active) return;
    try {
      const foundKey = await ApiKey.find();
      const time = foundKey[0].time;
      interval = time.interval
      const now = new Date().getHours();
      if (now > time.finish || now < time.start) return;
      await client.sendMessage(
        bot.group_id,
        responses[Math.floor(Math.random() * responses.length)].content
      );
      console.log("Mensaje enviado");
    } catch (e) {
      console.log("Ha ocurrido un error inesperado:", e);
    }
  }
  chat();
  const job = new CronJob(`*/${interval} * * * *`, chat, null, true, "America/Bogota");
  job.start();
}

export default train;
