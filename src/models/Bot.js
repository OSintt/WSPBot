import { Schema, model, Types } from "mongoose";

const BotSchema = new Schema({
  instance_id: {
    type: Number,
    required: true,
    unique: true,
  },
  t_active: {
    type: Boolean,
    default: false,
  },
  group_id: {
    type: String,
    default: '120363139133672481@g.us'
  },
  phone: {
    type: String,
    unique: true
  },
  celular: String,
  wsp: String,
  host: String,
  last_date: {
    type: Number,
    default: new Date().getUTCDate()
  },
  days: {
    default: 0,
    type: Number
  },
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