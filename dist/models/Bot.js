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
const _mongoose = require("mongoose");
const BotSchema = new _mongoose.Schema({
    instance_id: {
        type: Number,
        required: true,
        unique: true
    },
    t_active: {
        type: Boolean,
        default: true
    },
    group_id: {
        type: String,
        default: "120363139133672481@g.us"
    },
    phone: {
        type: String,
        unique: true
    },
    celular: String,
    wsp: String,
    host: String,
    first_date: {
        type: Date,
        default: new Date()
    },
    last_date: {
        type: Number,
        default: ()=>new Date().getUTCDate()
    },
    days: {
        default: 0,
        type: Number
    },
    messages: [
        {
            type: _mongoose.Types.ObjectId,
            ref: "Message"
        }
    ],
    numbers: [
        {
            type: _mongoose.Types.ObjectId,
            ref: "Number"
        }
    ]
});
const _default = (0, _mongoose.model)("Bott", BotSchema);
