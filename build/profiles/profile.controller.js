"use strict";

var _joi = _interopRequireDefault(require("joi"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports.createProfile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var Profile, _req$body, name, gender, newProfile;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Profile = req.context.models.Profile;
            console.log("%%%%: ", Profile);
            _context.prev = 2;
            _req$body = req.body, name = _req$body.name, gender = _req$body.gender;

            if (name) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: true,
              message: "Cannot post Profile."
            }));

          case 6:
            newProfile = new Profile({
              name: name,
              gender: gender
            });
            _context.next = 9;
            return newProfile.save();

          case 9:
            return _context.abrupt("return", res.status(200).json({
              success: true,
              message: "Profile Creation Successful"
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.error("Login error", _context.t0);
            return _context.abrupt("return", res.status(500).json({
              error: true,
              message: "Error creating profile."
            }));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=profile.controller.js.map