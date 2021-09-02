"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
}); // userSchema.statics.findByLogin = async function (login) {
//   let user = await this.findOne({
//     username: login,
//   });
//   if (!user) {
//     user = await this.findOne({ email: login });
//   }
//   return user;
// };

userSchema.pre("remove", function (next) {
  this.model("Message").deleteMany({
    user: this._id
  }, next);
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.js.map