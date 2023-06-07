import Bot from "../models/Bot";
import os from "os";

async function auth(client) {
  try {
    const group = await Bot.find();
    const message = await client.sendMessage(
      group[0].group_id,
      "Iniciando proceso de autenticación!"
    );
    const bot = await Bot.findOne({ phone: message.from.replace("@c.us", "") });
    if (bot && bot.host !== os.hostname()) {
      bot.host = os.hostname();
      await bot.save();
      console.log(
        "Bot autenticado en la máquina",
        os.hostname(),
        "y el número +",
        bot.phone
      );
    } else {
      console.log('Bot autenticado con el número', bot.phone);
    }
    return bot;
  } catch (e) {
    console.error('Ha ocurrido un error autenticando la máquina del bot', e);
  }
}

export default auth;
