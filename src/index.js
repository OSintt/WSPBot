import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import mongoose from "mongoose";
import train from "./methods/train";
import { config } from "dotenv";
import auth from "./methods/auth";

config();

mongoose
  .connect(process.env.URI)
  .then(async () => {
    const client = new Client({
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
    client.initialize();
  })
  .catch((e) => {
    console.log("Ha ocurrido un error inesperado", e);
  });