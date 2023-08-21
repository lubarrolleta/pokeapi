import axios from "axios";
import dotenv from "dotenv";
import fetch from "node-fetch";
import https from "https";
// import request from "request";
export class Querys {
  #url = null;
  #data = null;

  constructor(data) {
    // this.#init();
    if(data.type === 'getPokemons'){
      this.#getPokemons(data);
    }
  }
  #setUserData(data) {
    this.#data = data;
  }
  async #getPokemons(data) {
    return data;
  }
  async loginPost(data) {
    // console.log(data, "LINE 14");
    try {
      const config = {
        method: "POST",
        url: "https://us-east-1.aws.data.mongodb-api.com/app/data-fdyqt/endpoint/login",
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Request-Headers': '*',
          "api-key": process.env.APIKEYMONGO,
          "data" :   btoa(JSON.stringify(data))
        },
        // query:JSON.stringify(data),
        // data: JSON.stringify({data}),
        // body:data
      };
    //   const xhr = new XMLHttpRequest();
    //   xhr.open('POST',"https://us-east-1.aws.data.mongodb-api.com/app/data-fdyqt/endpoint/login",true);
    //   xhr.set
    
      const consulta = await axios(config);
      if (consulta.status === 200 && consulta.statusText === "OK") {
        // console.log(consulta.data);
        const response = {
          status: !consulta.data ? 404 : consulta.status,
          statusText: !consulta.data ? "fail" : consulta.statusText,
          data: consulta.data,
        };
        return response ? response : null;
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
          data: consulta.data,
        };
        //   console.log(consulta);

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
