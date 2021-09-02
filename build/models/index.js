"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("../users/user.model"));

var _job = _interopRequireDefault(require("../jobs/job.model"));

var _profile = _interopRequireDefault(require("../profiles/profile.model"));

var _message = _interopRequireDefault(require("./message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectDb = function connectDb() {
  return _mongoose["default"].connect(process.env.DATABASE_URL);
};

exports.connectDb = connectDb;
var models = {
  User: _user["default"],
  Message: _message["default"],
  Job: _job["default"],
  Profile: _profile["default"]
};
var _default = models;
exports["default"] = _default;
//# sourceMappingURL=index.js.map