import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import mongoose from "mongoose";
import listen from "./methods/listen";
import train from "./methods/train";
import { config } from "dotenv";
import auth from "./methods/auth";
import Bot from "./models/Bot";
config();

mongoose
  .connect(process.env.URI)
  .then(async () => {
    /*const client = new Client({
      authStrategy: new LocalAuth(),
    });
    let bot;
    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });
    client.on("ready", async () => {
      console.log("Cliente listo");
      bot = await auth(client);
      train(client, bot);
    });
    client.on("remote_session_saved", () => {
      console.log("Sesión del cliente autenticada");
    });
    /*client.on("message", async (message) => {
      listen(message, bot);
    })*/
    //client.initialize();

    const bots = await Bot.find();
    bots.forEach(bot => {
      console.log(bot.phone, '  ', bot.last_date);
    })
    
  })
  .catch((e) => {
    console.log("Ha ocurrido un error inesperado", e);
  });
