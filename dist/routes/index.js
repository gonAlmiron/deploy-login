"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _express = require("express");
var _path = _interopRequireDefault(require("path"));
var _log4js = _interopRequireDefault(require("log4js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
var passportOptions = {
  badRequestMessage: 'Falta username / password'
};
router.post('/signup', function (req, res, next) {
  _passport["default"].authenticate('signup', passportOptions, function (err, user, info) {
    console.log('Info SIGNUP');
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json(info);
    var logger = _log4js["default"].getLogger();
    logger.level = 'info';
    logger.info("Ruta /SIGNUP. Metogo POST");
    res.json({
      msg: 'signup OK'
    });
  })(req, res, next);
});
router.get('/', function (req, res) {
  res.json({
    pid: process.pid,
    msg: 'hola'
  });
});
router.post('/login', _passport["default"].authenticate('login', passportOptions), function (req, res) {
  var logger = _log4js["default"].getLogger();
  logger.level = 'info';
  logger.info("Ruta /LOGIN. Metogo POST");
  res.render('datos');
});
router.get('/login', function (req, res) {
  var logger = _log4js["default"].getLogger();
  logger.level = 'info';
  logger.info("Ruta /LOGIN. Metogo GET");
  res.render('login');
});
router.get('/signup', function (req, res) {
  res.render('signup');
});
router.get('/datos', function (req, res) {
  res.render('datos', {
    nombre: req.user
  });
});
router.get('/info', function (req, res) {
  var logger = _log4js["default"].getLogger();
  logger.level = 'info';
  logger.info("Ruta /INFO. Metogo GET");
  res.send({
    'directorio actual del trabajo': process.cwd(),
    'id del proceso': process.pid,
    'Version de Node': process.version,
    'titulo del proceso': process.title,
    'sistema operativo': process.platform,
    'uso de la memoria': process.memoryUsage()
  });
});
var scriptPath = _path["default"].resolve(__dirname, './utils/calculo.js');
router.get('/randoms', function (req, res) {
  var cantidad = req.query.cantidad;
  var computo = fork(scriptPath);
  computo.send(cantidad);
  computo.on('message', function (sum) {
    res.json({
      resultado: sum
    });
  });
});
var _default = router;
exports["default"] = _default;