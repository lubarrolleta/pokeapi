import express, { Router } from "express";
import { Querys } from "../../querys.js";
import { Crypto } from "../../encryp.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import bodyParser from "body-parser";
export const users = Router();

users.use(cookieParser());
users.use(bodyParser.urlencoded({ extended: true }));
users.use(cors());
users.get("/", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

  console.log(req.originalUrl);
  // res.writeHead(200,{'Content-Type': 'application/json'});
  const { data, status, statusText } = await new Querys().getUser();
  // console.log(consulta,'users');
  // res.appendHeader('Status Code','200');
  // res.json({ user:user});
  // res.header('Status Code',200);
  // console.log(data,statusText,status);
  // res.statusCode = 200;
  // res.type = 'application/json';
  // res.statusMessage = '200 statusText';
  // res.setHeader('Content-Type', 'application/json');
  res.status(status).json({ status, statusText, data });
});

users.post("/favorites", async (req, res) => {
    console.log(req.originalUrl);
  res.setHeader(
    "Access-Control-Request-Headers",
    "Data, Content-Type, Authorization"
  );
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Accept-Post", "application/json; charset=utf-8, text/html");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Content-Security-Policy", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Data, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Data, Content-Type, Authorization"
  );
  const r = req;
  // console.log(r.headers);
  if (!r.headers.hasOwnProperty("authorization")) {
    console.log("authorization no tiene");
    res.status(500).json({ message: "unauthorized" });
  } else {
    const checkExpire = await new Crypto().checkExpires(
      r.headers.authorization
    );
    // console.log(checkExpire);
    if (!checkExpire.active) {
      res.clearCookie("token");
      // res.redirect('/login')
      res.status(500).json({ message: checkExpire.message });
      return;
    }
    const { data, statusText, status } = await new Querys().postFavorites(
      r.headers,
      r.body
    );
    // console.log(dat);
    res.status(status).json({ status, statusText, data });
  }
});
users.get("/favorites/:id", async (req, res) => {
  const consulta = await new Querys().getFavoritesPokemons(req.params);
  res.status(consulta.status).json(consulta);
});
