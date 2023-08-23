import express, { Router } from "express";
import cookieParser from "cookie-parser";
import { Querys } from "../../querys.js";
import { Crypto } from "../../encryp.js";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';
export const login = new Router();
// const cors = require("cors.js");
login.use(cookieParser());
login.use(express.json());
login.use(bodyParser.urlencoded({ extended: true }));
login.use(bodyParser.json());
login.use(cors())
login.post("/", async (req, res) => {
  // console.log(req.body, "req body");
  const { email, pass } = req.body;
  // console.log(typeof req.body);
  const datos = JSON.parse(Object.keys(req.body)[0]);
  console.log("EMAIL=", datos);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Accept-Post", "application/json; charset=utf-8, text/html");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers","Data , Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Request-Headers",
    "Data , Content-Type, Authorization"
  );

  const { data, status, statusText } = await new Querys().loginPost({
    email: datos.email,
  });
  let dataPrev = {};
  if (status === 200) {
    const validaPass = datos.hasOwnProperty("pass")
      ? await new Crypto().validaPass(datos.pass, data.pass)
      : { message: "Pass incorrect or Email" };
    if (validaPass.message === "true") {
      res.cookie("token", new Crypto().getToken(data), {
        maxAge: 60 * 60 * 24 * 7 * 1000, // Duración de 7 dias
        httpOnly: true, // Protocolo http
        secure: false, // Conexión segura https
        sameSite: false, // No se enviará en peticiones cross-site});
      });

      dataPrev = {
        data: {
          id: data["_id"],
          name: data["name"],
          email: data.email,
          token: new Crypto().getToken(data),
        },
        status,
        statusText,
      };

      // res.setHeader("Content-Type", "application/json");
      res.status(status).json(dataPrev);
    } else {
      console.log("not");
      dataPrev = validaPass;
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
      // res.setHeader("Content-Type", "application/json");

      res.clearCookie("token");
      res
        .status(401)
        .json({ status: 401, statusText: "Invalid", data: dataPrev });
    }
  } else {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    // res.setHeader("Content-Type", "application/json");

    res.status(status).json({ status, statusText, data });
  }

  // res.status(status).json(dataPrev).cookie('user','value dos');
  //   console.log("Cookies: ", req.cookies);
  // res.cookie('user','value').send('cookie is send');
  // res.status(400).json({mes:'not'})
});
login.post("/register", async (req, res, next) => {
  console.log("resgister");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Accept-Post", "application/json; charset=utf-8, text/html");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","Data , Content-Type, Authorization");
  
  res.setHeader(
    "Access-Control-Request-Headers",
    "Data , Content-Type, Authorization"
  );
  // console.log(req.body);
  const data = Object.keys(req.body)[0];
  const consulta = await new Querys().newUserPost(data);
  if (!consulta.status === 200) {
    res.status(500).json(consulta.data);
    return;
  }
  const dataPrev = {
    status: consulta.status,
    statusCode: consulta.statusText,
    data: {
      ...consulta.data,
      token: new Crypto().getToken(consulta.data),
    },
  };
  res.status(consulta.status).json(dataPrev);
});
login.post('/me',async (req, res) => {
  console.log(req.originalUrl);
  res.setHeader(
    "Access-Control-Request-Headers",
    "Data, Content-Type, Authorization"
  );
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Accept-Post", "application/json; charset=utf-8, text/html");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader('Content-Security-Policy',"http://localhost:3001");
  res.setHeader("Access-Control-Allow-Headers","Data, Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers","Data, Content-Type, Authorization")
  const data = Object.keys(req.body)[0];
  console.log(req.headers);
  const me = await new Querys().getMe(data);
  console.log(me);
  res.status(me.status).json(me)
})
