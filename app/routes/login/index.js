import { Router } from "express";
import cookieParser from "cookie-parser";
import { Querys } from "../../querys.js";
import { Crypto } from "../../encryp.js";
export const login = new Router();
login.use(cookieParser());
login.post("/", async (req, res) => {
  // console.log('Signed Cookies: ', req.signedCookies);
  // console.log(req.originalUrl,'originalUrl');
  // console.log(req['_parsedUrl']?.search,'body');
  const { email, pass } = req.body;
//   console.log({ email }, "REG HH");
  const { data, status, statusText } = await new Querys().loginPost({ email });

  let dataPrev = {};
  if (status === 200) {
    const validaPass = await new Crypto().validaPass(pass, data.pass);
    if (validaPass.message === true) {
      res.cookie("token", new Crypto().getToken(data), {
        maxAge: 60 * 60 * 24 * 7 * 1000, // Duración de 7 dias
        httpOnly: true, // Protocolo http
        secure: false, // Conexión segura https
        sameSite: true, // No se enviará en peticiones cross-site});
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
      res.setHeader("Content-Type", "application/json");
      res.status(status).json(dataPrev);
    } else {
      dataPrev = validaPass;
      res.clearCookie("token");
      res.status(400).json(dataPrev);
    }
  }

  // res.status(status).json(dataPrev).cookie('user','value dos');
//   console.log("Cookies: ", req.cookies);
  // res.cookie('user','value').send('cookie is send');
  // res.status(400).json({mes:'not'})
});
