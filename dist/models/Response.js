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
const ResponseSchema = new _mongoose.Schema({
    content: String
});
const _default = (0, _mongoose.model)('Response', ResponseSchema);
