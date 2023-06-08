import Bot from '../models/Bot';

async function editBots() {
    const bots = await Bot.find();
    for (let bot of bots) {
        bot.group_id = '120363139133672481@g.us';
        await bot.save();
        console.log(bot);
    }
}

export { editBots }