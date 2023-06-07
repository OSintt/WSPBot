import { Schema, model, Types } from "mongoose";

const BotSchema = new Schema({
  t_active: {
    type: Boolean,
    default: false,
  },
  instance_id: {
    unique: true,
    type: String,
    required: true,
  },
  group_id: String,
  phone: {
    type: String,
    unique: true
  },
  celular: String,
  wsp: String,
  host: String,
  messages: [
    {
      type: Types.ObjectId,
      ref: "Message",
    },
  ],
  numbers: [
    {
      type: Types.ObjectId,
      ref: "Number",
    },
  ],
});

export default model("Bot", BotSchema);