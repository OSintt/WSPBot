import Numbers from "../models/Number";
import Message from "../models/Message";

const questions = [
  {
    q: "¿Cuánto debo?",
    a: "Por favor adjuntar una copia del comprobante de pago",
  },
  {
    q: "El deudor falleció",
    a: "Por favor acercarse a una de las agencias antes detalladas con el certificado de defunción para poner en conocimiento del particular",
  },
  {
    q: "Ya pagué mi deuda",
    a: "Por favor adjuntar una copia del comprobante de pago",
  },
  {
    q: "Número equivocado",
    a: "Por favor comunicarse al número de teléfono 0996369926 a fin de poder eliminar su registro de la base de datos",
  },
  {
    q: "Deseo saber el número y tipo de servicio al que corresponde esta deuda",
    a: 'Por favor enviar su número de cédula al número de teléfono 0996369926 y preguntar con la leyenda "necesito número y tipo de servicio',
  },
];

const initialRes = `Buenos días, soy un servicio de ayuda automático.\nPara más información sobre su deuda envíe el número según su pregunta correspondiente:\n${questions
  .map((q, i) => `[${i + 1}] ${q.q}`)
  .join("\n")}`;

async function listen(message) {
  if (message.from.endsWith("@g.us") || message._data.id.fromMe) return;
  console.log(message);
  try {
    const number = await Numbers.findOne({
      telefono: {
        $regex: new RegExp(`^${message.from.replace("593", "")}`),
      },
    });
    const msg = message.body;
    const filter = msg == 2 || msg == 3 || msg == 4;
    const answer =
      isNaN(msg) || msg > 5 || msg < 1
        ? initialRes
        : `*${questions[Number(msg) - 1].q}:*\n${
            questions[Number(msg) - 1].a
          }` || initialRes;
    if (number) {
      const newMsg = new Message({
        author: number._id,
        content: msg,
        date: new Date(),
      });
      const savedMsg = await newMsg.save();
      bot.messages.push(savedMsg._id);
      await bot.save();
      if (filter) {
        if (number.eliminar) return;
        number.eliminar = true;
        number.causa = msg;
        await number.save();
      }
    }
    await message.reply(answer);
  } catch (e) {
    console.log("Ocurrió un error respondiendo mensajes", e);
  }
}

export default listen;
