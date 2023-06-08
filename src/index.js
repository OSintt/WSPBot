import qrcode from "qrcode-terminal";
import { Client, RemoteAuth } from "whatsapp-web.js";
import { MongoStore } from "wwebjs-mongo";
import mongoose from "mongoose";
import listen from "./methods/listen";
import train from "./methods/train";
import { config } from "dotenv";
import auth from "./methods/auth";
config();
mongoose.connect(process.env.URI).then(async () => {
  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 300000,
    }),
  });
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });
  client.on("remote_session_saved", () => {
    console.log('Sesión del cliente autenticada');
    train(client, auth(client));
  });
  client.on("message", async (message) => {
    listen(message);
  });
  client.initialize();
});
