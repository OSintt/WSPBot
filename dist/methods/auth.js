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
const _os = /*#__PURE__*/ _interop_require_default(require("os"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function auth(client) {
    try {
        const bots = await _Bot.default.find();
        const message = await client.sendMessage('120363139133672481@g.us', "Iniciando proceso de autenticación en la máquina " + _os.default.hostname() + '!');
        let bot = await _Bot.default.findOne({
            phone: message.from.replace("@c.us", "")
        });
        if (bot && bot.host !== _os.default.hostname()) {
            bot.host = _os.default.hostname();
            await bot.save();
            console.log("Bot autenticado en la máquina", _os.default.hostname(), "y el número +", bot.phone);
        } else {
            if (!bot) {
                const newBot = new _Bot.default({
                    instance_id: Math.random() * 1000000,
                    phone: message.from.replace("@c.us", ""),
                    host: _os.default.hostname(),
                    celular: 'N/A',
                    wsp: 'N/A'
                });
                bot = await newBot.save();
            }
            console.log('Bot creado y autenticado con el número', bot.phone, 'en la máquina', _os.default.hostname());
        }
        return bot;
    } catch (e) {
        console.error('Ha ocurrido un error autenticando la máquina del bot', e);
    }
}
const _default = auth;
