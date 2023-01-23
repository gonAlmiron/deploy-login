import express from 'express';
import mainRouter from '../routes';
import session from 'express-session';
import passport from 'passport';
import { loginFunc, signUpFunc } from './auth';
import MongoStore from 'connect-mongo';
import Config from '../config';
import path from 'path'; 
import {engine} from 'express-handlebars'
import cookieParser from 'cookie-parser';
import minimist from 'minimist';
import compression from 'compression'




const ttlSeconds = 180;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_URL,
    // crypto: {
    //   secret: 'squirrel',
    // },
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

const app = express();
const mySecret = 'mySecret';

app.use(cookieParser(mySecret));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../public')));

app.use(compression())


const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutsFolderPath = `${viewsFolderPath}/layouts`;
const partialsFolderPath = `${viewsFolderPath}/partials`;
const defaultLayoutPath = `${layoutsFolderPath}/index.hbs`;

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

app.engine('hbs', engine({
    layoutsDir: layoutsFolderPath,
	extname: 'hbs',
	defaultLayout: defaultLayoutPath,
    partialsDir: partialsFolderPath
}));


app.use(session(StoreOptions));

//Indicamos que vamos a usar passport en todas nuestras rutas
app.use(passport.initialize());

//Permitimos que passport pueda manipular las sessiones de nuestra app
app.use(passport.session());

// Cuando un usuario se autentique correctamente, passport va a devolver en la session la info del usuario
passport.use('login', loginFunc);

//signUpFunc va a ser una funcion que vamos a crear y va a tener la logica de registro de nuevos usuarios
passport.use('signup', signUpFunc);



const argumentos = {
  alias: {
      p: 'port'
  },
  default: {
      port: 8080,

  }
};

const args = minimist(process.argv.slice(2), argumentos)
console.log(args)

app.use('/api', mainRouter);

export default app;