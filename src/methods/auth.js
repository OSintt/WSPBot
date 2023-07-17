import Bot from "../models/Bot";
import os from "os";

async function auth(client) {
  try {
    const bots = await Bot.find();
    const message = await client.sendMessage(
      '120363139133672481@g.us',
      "Iniciando proceso de autenticación en la máquina " + os.hostname() + '!'
    );
    let bot = await Bot.findOne({ phone: message.from.replace("@c.us", "") });
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
      if (!bot) {
        const newBot = new Bot({
          instance_id: Math.random() * 1000000,
          phone: message.from.replace("@c.us", ""),
          host: os.hostname(),
          celular: 'N/A',
          wsp: 'N/A',
        });
        bot = await newBot.save();
      }
      console.log('Bot creado y autenticado con el número', bot.phone, 'en la máquina', os.hostname());
    }
    return bot;
  } catch (e) {
    console.error('Ha ocurrido un error autenticando la máquina del bot', e);
  }
}

export default auth;
