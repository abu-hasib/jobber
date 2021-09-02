"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jobSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

var Job = _mongoose["default"].model("Job", jobSchema);

var _default = Job;
exports["default"] = _default;
//# sourceMappingURL=job.model.js.map