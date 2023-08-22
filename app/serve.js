import express from 'express';
import {Router} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Querys } from './querys.js';
import Buffer from 'buffer';
import { users } from './routes/users/index.js';
import { pokemon } from './routes/pokemon/index.js';
import { Crypto } from './encryp.js';
import { login } from './routes/login/index.js';
dotenv.config();
const app = express();
const port =process.env.PORT ;
console.log(port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({extended: true}));
const route = Router();

app.get('/', function(req, res) {
    const randon = new Crypto();
    console.log(randon.randon());
    res.json({ mensaje: 'Bienvenido a la api' })   
});

app.use('/pokemon',pokemon);  
app.use('/users', users);
app.use('/login', login);
app.listen(port);
console.log('API escuchando port'+ port);  