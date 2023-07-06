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
    type: Date,
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