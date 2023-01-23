"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _routes = _interopRequireDefault(require("../routes"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _auth = require("./auth");
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _config = _interopRequireDefault(require("../config"));
var _path = _interopRequireDefault(require("path"));
var _expressHandlebars = require("express-handlebars");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _minimist = _interopRequireDefault(require("minimist"));
var _compression = _interopRequireDefault(require("compression"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ttlSeconds = 180;
var StoreOptions = {
  store: _connectMongo["default"].create({
    mongoUrl: _config["default"].MONGO_ATLAS_URL
    // crypto: {
    //   secret: 'squirrel',
    // },
  }),

  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000
  }
};
var app = (0, _express["default"])();
var mySecret = 'mySecret';
app.use((0, _cookieParser["default"])(mySecret));
app.use(_express["default"]["static"]('public'));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../../public')));
app.use((0, _compression["default"])());
var viewsFolderPath = _path["default"].resolve(__dirname, '../../views');
var layoutsFolderPath = "".concat(viewsFolderPath, "/layouts");
var partialsFolderPath = "".concat(viewsFolderPath, "/partials");
var defaultLayoutPath = "".concat(layoutsFolderPath, "/index.hbs");
app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);
app.engine('hbs', (0, _expressHandlebars.engine)({
  layoutsDir: layoutsFolderPath,
  extname: 'hbs',
  defaultLayout: defaultLayoutPath,
  partialsDir: partialsFolderPath
}));
app.use((0, _expressSession["default"])(StoreOptions));

//Indicamos que vamos a usar passport en todas nuestras rutas
app.use(_passport["default"].initialize());

//Permitimos que passport pueda manipular las sessiones de nuestra app
app.use(_passport["default"].session());

// Cuando un usuario se autentique correctamente, passport va a devolver en la session la info del usuario
_passport["default"].use('login', _auth.loginFunc);

//signUpFunc va a ser una funcion que vamos a crear y va a tener la logica de registro de nuevos usuarios
_passport["default"].use('signup', _auth.signUpFunc);
var argumentos = {
  alias: {
    p: 'port'
  },
  "default": {
    port: 8080
  }
};
var args = (0, _minimist["default"])(process.argv.slice(2), argumentos);
console.log(args);
app.use('/api', _routes["default"]);
var _default = app;
exports["default"] = _default;