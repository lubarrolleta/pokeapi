import axios from "axios";
import { URLAPIREST } from "../Constants/constantes";

export class Querys {
    async getMe(data){
        console.log(data);
        try {
            const config = {
                method: 'POST',
                url:URLAPIREST+'/login/me',
                headers: {
                    // "Content-Type": "application/json",
                    // 'Access-Control-Allow-Origin':"http://localhost:3001",
                    // 'Mode': 'no-cors',
                    'Authorization': 'Bearer '+window.localStorage.getItem('token')
                },
                data :data
            };
            const consulta = await axios(config);
            return consulta.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async postFavorites(data){
        try {
            const config = {
                method:"post",
                url: URLAPIREST+"/users/favorites",
                headers: {
                    "Authorization": "Bearer "+ window.localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                data: data
              }
              const consulta = await axios(config);
              return consulta.data;
              
          } catch (error) {
            console.error(error);
            return error && error.response;
          }
    }
    async getUsers(){
        try {
            const config = {
                method:"get",
                url:URLAPIREST+ "/users",
                headers: {},

            }
            const consulta = await axios(config);
            return consulta.data;
        } catch (error) {
            console.error(error);
            return error && error.response
        }
    }
}