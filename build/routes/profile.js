"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _profile = _interopRequireDefault(require("../profiles/profile.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post("/new", _profile["default"].createProfile);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=profile.js.map