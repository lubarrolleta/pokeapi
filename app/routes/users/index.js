import express,{ Router } from "express";
import { Querys } from "../../querys.js";
import { Crypto } from "../../encryp.js";
import cookieParser from "cookie-parser";

export const users = Router();

users.use(cookieParser());
users.get('/', async function(req, res) {
    console.log(req.originalUrl);
    // res.writeHead(200,{'Content-Type': 'application/json'});
    const {data,status,statusText} = await new Querys().getUser();
    // console.log(consulta,'users');
    // res.appendHeader('Status Code','200');
    // res.json({ user:user});
    // res.header('Status Code',200);
    // console.log(data,statusText,status);
    // res.statusCode = 200;
    // res.type = 'application/json';
    // res.statusMessage = '200 statusText';
    // res.setHeader('Content-Type', 'application/json');
    res.status(status).json({status,statusText,data}); 

});
users.post('/favorites',async(req,res)=>{
    const r = req;
    // console.log(r.headers);
    if(!r.headers.hasOwnProperty('authorization')){
        console.log('authorization no tiene');
        res.status(500).json({message: 'unauthorized'});
    }else{
        const checkExpire = await new Crypto().checkExpires(r.headers.authorization);
        // console.log(checkExpire);
        if(!checkExpire.active){
            res.clearCookie('token');
            // res.redirect('/login')
            res.status(500).json({message: checkExpire.message});
            return;
        }
        const {data,statusText,status} = await new Querys().postFavorites(r.headers,r.body);
        // console.log(dat);
        res.status(status).json({status,statusText,data})
    }
});
users.get('/favorites/:id', async (req, res)=>{
    const consulta = await new Querys().getFavoritesPokemons(req.params);
        res.status(consulta.status).json(consulta)
})


