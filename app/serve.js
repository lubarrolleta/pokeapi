import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Querys } from './querys.js';
import Buffer from 'buffer';
dotenv.config();
const app = express();
const port =process.env.PORT ;
console.log(port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({extended: true}));
app.get('/', function(req, res) {
    res.json({ mensaje: '¡Hola Mundo!' })   
});
app.get('/users', async function(req, res) {
    console.log(req.originalUrl);
    // res.writeHead(200,{'Content-Type': 'application/json'});
    const {data,status,statusText} = await new Querys().getUser();
    // console.log(user,'users');
    // res.appendHeader('Status Code','200');
    // res.json({ user:user});
    // res.header('Status Code',200);
    // console.log(data,statusText,status);
    // res.statusCode = 200;
    // res.type = 'application/json';
    // res.statusMessage = '200 statusText';
    // res.setHeader('Content-Type', 'application/json');
    res.status(status).json(data); 

});
app.post('/login', async (req,res)=>{
    // console.log(req.originalUrl,'originalUrl');
    // console.log(req['_parsedUrl']?.search,'body');
    // console.log(req.body,'REG HH');
    const {data,status,statusText} = await new Querys().loginPost(req.body);
    
    const dataPrev = {data: btoa(JSON.stringify(data)),status,statusText};
    // console.log(dataPrev);
    res.status(status).json(dataPrev);
    // res.status(400).json({mes:'not'})
})  
app.listen(port);
console.log('API escuchando port'+ port);  