"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _Bot = /*#__PURE__*/ _interop_require_default(require("../models/Bot"));
const _cron = require("cron");
const _Response = /*#__PURE__*/ _interop_require_default(require("../models/Response"));
const _ApiKey = /*#__PURE__*/ _interop_require_default(require("../models/ApiKey"));
const _os = /*#__PURE__*/ _interop_require_default(require("os"));
const _promises = /*#__PURE__*/ _interop_require_default(require("fs/promises"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function train(client, bot) {
    const responses = await _Response.default.find();
    const key = await _ApiKey.default.find();
    bot = await bot;
    let interval = key[0].time.interval;
    async function chat() {
        const checkBot = await _Bot.default.findOne({
            phone: bot.phone
        });
        if (!checkBot.t_active) return;
        if (checkBot.host !== _os.default.hostname()) {
            throw Error("Se frenó la ejecución de entrenamiento por número repetido en distintas máquinas");
        }
        try {
            const foundKey = await _ApiKey.default.find();
            const time = foundKey[0].time;
            const intervals = [
                0,
                1,
                2,
                3,
                0.5,
                -0.5
            ];
            const lastDate = checkBot.last_date;
            interval = intervals[Math.floor(Math.random() * intervals.length)];
            const now = new Date().getHours();
            if (now > time.finish || now < time.start) return;
            await client.sendMessage(bot.group_id, responses[Math.floor(Math.random() * responses.length)].content);
            const today = new Date().getUTCDate();
            if (today !== lastDate) {
                bot.days += 1;
                bot.last_date = today;
                await bot.save();
            }
            console.log("Mensaje enviado");
        } catch (e) {
            console.log("Ha ocurrido un error inesperado:", e);
        }
    }
    chat();
    const job = new _cron.CronJob(`*/${interval} * * * *`, chat, null, true, "America/Bogota");
    job.start();
}
const _default = train;
