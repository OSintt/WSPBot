"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "editBots", {
    enumerable: true,
    get: function() {
        return editBots;
    }
});
const _Bot = /*#__PURE__*/ _interop_require_default(require("../models/Bot"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function editBots() {
    const bots = await _Bot.default.find();
    for (let bot of bots){
        bot.group_id = '120363139133672481@g.us';
        await bot.save();
        console.log(bot);
    }
}
