import { Router } from "express";
import { Querys } from "../../querys.js";
import { Crypto } from "../../encryp.js";
import { ENCRYPT } from "../../constantes/constantes.js";

export const pokemon = Router();

pokemon.get("/", async (req, res) => {
  // console.log(req.method);
  const dataPrev = { method: req.method, url: req.originalUrl };
  const { data, status, statusText } = await new Querys().getPokemons(dataPrev);
  // console.log(data,'linea 46');
  const modData = (data) => {
    const dataPrev = data.results.map((data) => ({// mapeo los pokemon para mostrar imagenes ya que la api de fabrica no tiene estas opciones
      id: data.url.split("/").at(-2),
        name: data.name,
      url: data.url.replace(process.env.pokemon, ""),
      poster:
        process.env.URLPOSTERPOKEAPI + data.url.split("/").at(-2) + ".png",
    }));
    const next = data.next && data.next.replace(process.env.pokemon, "");
    const previous =
      data.previous && data.previous.replace(process.env.pokemon, "");
    // const dataEncrypted = new Crypto().encryt(exportData);
    const exportData = {
      count: data.count,
      next: next,
      previous: previous,
      results: dataPrev,
    };

    // console.log(new Crypto().encryt(exportData));
    return exportData;
  };
  // console.log(process.env.ENCRYPT);
  res.setHeader('Access-Control-Allow-Origin',' http://localhost:3001');

  res
    .status(status)
    .json({
      status,
      statusText,
      data: ENCRYPT === true ? new Crypto().encryt(modData(data)) : modData(data),// encrypto los datos para que solo desde el front de la app se vean los pokemon 
    });
});

