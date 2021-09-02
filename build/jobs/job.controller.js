"use strict";

var _joi = _interopRequireDefault(require("joi"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports.createNewJob = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var Job, _req$body, title, description, newJob;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Job = req.context.models.Job;
            console.log("%%%%: ", Job);
            _context.prev = 2;
            _req$body = req.body, title = _req$body.title, description = _req$body.description;

            if (!(!title || !description)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: true,
              message: "Cannot post job."
            }));

          case 6:
            newJob = new Job({
              title: title,
              description: description
            });
            _context.next = 9;
            return newJob.save();

          case 9:
            return _context.abrupt("return", res.status(200).json({
              success: true,
              message: "Job Successful"
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.error("Login error", _context.t0);
            return _context.abrupt("return", res.status(500).json({
              error: true,
              message: "Error posting job."
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

exports.getAllJobs = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var Job, jobs;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            Job = req.context.models.Job;
            _context2.next = 3;
            return Job.find();

          case 3:
            jobs = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              success: true,
              jobs: jobs
            }));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
//# sourceMappingURL=job.controller.js.map