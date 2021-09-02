"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var messageSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var Message = _mongoose["default"].model('Message', messageSchema);

var _default = Message;
exports["default"] = _default;
//# sourceMappingURL=message.js.map