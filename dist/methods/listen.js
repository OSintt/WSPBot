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
const _Number = /*#__PURE__*/ _interop_require_default(require("../models/Number"));
const _Message = /*#__PURE__*/ _interop_require_default(require("../models/Message"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const questions = [
    {
        q: "¿Cuánto debo?",
        a: "Por favor acérquese a una de las agencias cercana a su domicilio"
    },
    {
        q: "El deudor falleció",
        a: "Por favor acercarse a una de las agencias antes detalladas con el certificado de defunción para poner en conocimiento del particular"
    },
    {
        q: "Ya pagué mi deuda",
        a: "Por favor adjuntar una copia del comprobante de pago"
    },
    {
        q: "Número equivocado",
        a: "Por favor comunicarse al número de teléfono 0996369926 a fin de poder eliminar su registro de la base de datos"
    },
    {
        q: "Deseo saber el número y tipo de servicio al que corresponde esta deuda",
        a: 'Por favor enviar su número de cédula al número de teléfono 0996369926 y preguntar con la leyenda "necesito número y tipo de servicio'
    }
];
const initialRes = `Buenos días, soy un servicio de ayuda automático.\nPara más información sobre su deuda envíe el número según su pregunta correspondiente:\n${questions.map((q, i)=>`[${i + 1}] ${q.q}`).join("\n")}`;
async function listen(message, bot) {
    if (message.from.endsWith("@g.us") || !message.body || message.body === '') return;
    try {
        /*const number = await Numbers.findOne({
      telefono: {
        $regex: new RegExp(`^${message.from.replace("593", "")}`),
      },
    });*/ const msg = message.body;
        //const filter = msg == 2 || msg == 3 || msg == 4;
        const answer = isNaN(msg) || msg > 5 || msg < 1 ? initialRes : `*${questions[Number(msg) - 1].q}:*\n${questions[Number(msg) - 1].a}` || initialRes;
        //if (number) {
        const authorExists = await _Message.default.findOne({
            author: message.from
        });
        if (authorExists && answer === initialRes) return;
        const newMsg = new _Message.default({
            author: message.from,
            content: msg,
            date: new Date()
        });
        const savedMsg = await newMsg.save();
        bot.messages.push(savedMsg._id);
        await bot.save();
        /*if (filter) {
        if (number.eliminar) return;
        number.eliminar = true;
        number.causa = msg;
        await number.save();
      }*/ //}
        await message.reply(answer);
    } catch (e) {
        console.log("Ocurrió un error respondiendo mensajes", e);
    }
}
const _default = listen;
