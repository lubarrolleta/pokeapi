import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import CardPokemon from "../Pokemon/show pokemon/CardPokemon";

const PokemonDetail = () => {
  const params = useParams();
  const { data ,setFavorites} = useAuth();
//   console.log(params);
 
 const route = useNavigate();
  useEffect(() => {
      if(params){}
        
  }, [params]);
  return (
    <>
      {data.favorites.favoritesUsers && (
        <h5 style={{ textAlign: "center" }}>
          @{data.favorites.favoritesUsers}
        </h5>
      )}
      <section
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
           
        {data.favorites &&
            data.favorites.favorites.length > 0 &&
            data.favorites.favorites.map((fav) => (
              <CardPokemon key={fav.id} data={fav} />
            ))}
      </section>
    </>
  );
};

export default PokemonDetail;
