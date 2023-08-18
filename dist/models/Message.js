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
const MessageSchema = new _mongoose.Schema({
    author: {
        type: _mongoose.Types.ObjectId,
        ref: 'Number'
    },
    content: String,
    date: Date
});
const _default = (0, _mongoose.model)('Message', MessageSchema);
