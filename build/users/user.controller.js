"use strict";

var _joi = _interopRequireDefault(require("joi"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Validate user schema
var userSchema = _joi["default"].object().keys({
  email: _joi["default"].string().email({
    minDomainSegments: 2
  }),
  password: _joi["default"].string().required().min(4),
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref("password")).required()
});

exports.Signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var User, result, user, hash, id, newUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            User = req.context.models.User;
            _context.prev = 1;
            result = userSchema.validate(req.body);

            if (!result.error) {
              _context.next = 6;
              break;
            }

            console.log(result.error.message);
            return _context.abrupt("return", res.json({
              error: true,
              status: 400,
              message: result.error.message
            }));

          case 6:
            _context.next = 8;
            return User.findOne({
              email: result.value.email
            });

          case 8:
            user = _context.sent;

            if (!user) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.json({
              error: true,
              message: "Email is already in use"
            }));

          case 11:
            _context.next = 13;
            return User.hashPassword(result.value.password);

          case 13:
            hash = _context.sent;
            id = (0, _uuid.v4)(); //Generate unique id for the user.

            result.value.userId = id; //redundant hence deletion from db

            delete result.value.confirmPassword;
            result.value.password = hash;
            newUser = new User(result.value);
            _context.next = 21;
            return newUser.save();

          case 21:
            return _context.abrupt("return", res.status(200).json({
              success: true,
              message: "Registration Successful"
            }));

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](1);
            console.error("signup-error", _context.t0);
            return _context.abrupt("return", res.status(500).json({
              error: true,
              message: "Cannot Register"
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 24]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.Login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var User, _req$body, email, password, user, isValid;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            User = req.context.models.User;
            _context2.prev = 1;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            if (!(!email || !password)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: true,
              message: "Cannot authorize user."
            }));

          case 5:
            _context2.next = 7;
            return User.findOne({
              email: email
            });

          case 7:
            user = _context2.sent;

            if (user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              error: true,
              message: "Account not found"
            }));

          case 10:
            _context2.next = 12;
            return User.comparePasswords(password, user.password);

          case 12:
            isValid = _context2.sent;

            if (isValid) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: true,
              message: "Invalid credentials"
            }));

          case 15:
            _context2.next = 17;
            return user.save();

          case 17:
            return _context2.abrupt("return", res.send({
              success: true,
              message: "User logged in successfully"
            }));

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](1);
            console.error("Login error", _context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              error: true,
              message: "Couldn't login. Please try again later."
            }));

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 20]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
//# sourceMappingURL=user.controller.js.map