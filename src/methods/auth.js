import Bot from "../models/Bot";
import os from 'os';

async function auth(client) {
  const group = await Bot.find();
  const message = await client.sendMessage(
    group[0].group_id,
    'Iniciando proceso de autenticación!'
  );
  const bot = await Bot.findOne({phone: message.from.replace('@c.us', '')});
  if (bot && bot.host !== os.hostname()) {
    bot.host = os.hostname();
    await bot.save();
    console.log('Bot autenticado en la máquina', os.hostname());
  }
  return bot;
}

export default auth;
