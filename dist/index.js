"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _qrcodeterminal = /*#__PURE__*/ _interop_require_default(require("qrcode-terminal"));
const _whatsappweb = require("whatsapp-web.js");
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
const _train = /*#__PURE__*/ _interop_require_default(require("./methods/train"));
const _dotenv = require("dotenv");
const _auth = /*#__PURE__*/ _interop_require_default(require("./methods/auth"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _dotenv.config)();
_mongoose.default.connect(process.env.URI).then(async ()=>{
    const client = new _whatsappweb.Client({
        authStrategy: new _whatsappweb.LocalAuth()
    });
    let bot;
    client.on("qr", (qr)=>{
        _qrcodeterminal.default.generate(qr, {
            small: true
        });
    });
    client.on("ready", async ()=>{
        console.log("Cliente listo");
        bot = await (0, _auth.default)(client);
        (0, _train.default)(client, bot);
    });
    client.initialize();
}).catch((e)=>{
    console.log("Ha ocurrido un error inesperado", e);
});
