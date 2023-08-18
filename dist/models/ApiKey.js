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
const KeySchema = new _mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    time: {
        start: Number,
        finish: Number,
        interval: Number
    }
});
const _default = (0, _mongoose.model)('ApiKey', KeySchema);
