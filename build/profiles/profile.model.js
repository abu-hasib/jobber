"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var profileSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String
  }
}, {
  timestamps: true
});

var Profile = _mongoose["default"].model("Profile", profileSchema);

var _default = Profile;
exports["default"] = _default;
//# sourceMappingURL=profile.model.js.map