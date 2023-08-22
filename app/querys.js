import axios from "axios";
import dotenv from "dotenv";
import fetch from "node-fetch";
import https from "https";
import { Crypto } from "./encryp.js";
// import request from "request";
export class Querys {
  #url = null;
  #data = null;

  constructor(data) {
    // this.#init();
  }
  #setUserData(data) {
    this.#data = data;
  }
  async postFavorites(headers, body) {
    console.log(headers, body);
    try {
      const iduser = await new Crypto().decryt(
        headers.authorization.replace("Bearer ", "")
      );
      const dataPrev = {
        ["email"]: iduser?.email,
        ...body,
      };
      // console.log(dataPrev);
      const config = {
        method: "POST",
        url: "https://us-east-1.aws.data.mongodb-api.com/app/data-fdyqt/endpoint/postFavorites",
        headers: {
          "Content-Type": "application/json",
          // 'Access-Control-Request-Headers': '*',
          "api-key": process.env.APIKEYMONGO,
          data: btoa(JSON.stringify(dataPrev)),
        },
        // data: JSON.stringify(body)
      };
      const consulta = await axios(config);
      if (consulta.status === 200 && consulta.statusText === "OK") {
        const response = {
          status: !consulta.data ? 404 : consulta.status,
          statusText: !consulta.data ? "fail" : consulta.statusText,
          data: consulta.data,
        };
        // console.log(consulta,'line 46');
        return response;
      }
    } catch (error) {
      console.error(error);
      return { status: 500, statusText: "error vps", data: error.message };
    }
  }
  async getPokemons(data) {
    // obtengo los pokemon
    // console.log(data.url.split("/"));
    try {
      const config = {
        method: data?.method, // obtengo el metodo para asi tener una funcion generica
        url: data.url.includes("pokemon")
          ? process.env.pokemon + data.url
          : null,
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(config.url);
      const consulta = await axios(config);
      // console.log(consulta);
      if (consulta.status === 200 && consulta.statusText === "OK") {
        const response = {
          status: !consulta.data ? 404 : consulta.status,
          statusText: !consulta.data ? "fail" : consulta.statusText,
          data: consulta.data,
        };
        // console.log(consulta.data);
        return response ? response : null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return data;
  }
  async loginPost(data) {
    // console.log(data, "LINE 14");
    try {
      const config = {
        method: "POST",
        url: "https://us-east-1.aws.data.mongodb-api.com/app/data-fdyqt/endpoint/login",
        headers: {
          "Content-Type": "application/json",
          // 'Access-Control-Request-Headers': '*',
          "api-key": process.env.APIKEYMONGO,
          data: btoa(JSON.stringify(data)),
        },
      };

      const consulta = await axios(config);
      console.log(consulta);
      if (consulta.status === 200 && consulta.statusText === "OK") {
        
        const response = {
          status: !consulta.data ? 404 : consulta.status,
          statusText: !consulta.data ? "fail" : consulta.statusText,
          data: !consulta.data ? {message:'user not created'} : consulta.data,
        };

        return response ? response : null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getFavoritesPokemons(id) {
    try {
      const config = {
        method: "GET",
        url: "https://us-east-1.aws.data.mongodb-api.com/app/data-fdyqt/endpoint/favoritesPokemons",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.APIKEYMONGO,
        },
      };
      const consulta = await axios(config);
      if (consulta.status === 200 && consulta.statusText === "OK") {
        const user = await consulta.data.find((user) => user["_id"] === id.id);
        const data = user
          ? {
              status: 200,
              statusText: "OK",
              data: {
                _id: user["_id"],
                name: user.name,
                favorites: user.favorites,
              },
            }
          : {
              status: 400,
              statusText: "Not exist user",
              data: null,
            };

        return data;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getUser() {
    try {
      var config = {
        method: "get",
        url: "https://us-east-1.aws.data.mongodb-api.com/app/data-fdyqt/endpoint/users",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.APIKEYMONGO,
        },
        // data: data
      };
      const consulta = await axios(config);
      if (consulta.status === 200 && consulta.statusText === "OK") {
        const response = {
          status: consulta.status,
          statusText: consulta.statusText,
          data: consulta.data.map((data) => ({
            ["_id"]: data["_id"],
            name: data.name,
            email: new Crypto().encryptPass(data.email),
            favorites: data.favorites,
          })), // mapeo la respuesta encryto el correo
        };
        console.log(consulta.data);

        return response ? response : null;
      }
      // console.log(this.#data,'data');
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async #init() {
    // var axios = require('axios');
    var data = JSON.stringify({
      collection: "users",
      database: "waco",
      dataSource: "proyectWa",
      projection: {
        _id: 1,
      },
    });

    var config = {
      method: "get",
      url: "https://us-east-1.aws.data.mongodb-api.com/app/data-fdyqt/endpoint/users",
      headers: {
        //   'Content-Type': 'application/json',
        //   'Access-Control-Request-Headers': '*',
        "api-key": process.env.APIKEYMONGO,
      },
      // data: data
    };
    const consulta = await axios(config);
    consulta.status === 200 &&
      consulta.statusText === "OK" &&
      this.#setUserData(consulta.data);
    // console.log(this.#data,'data');
  }
}
