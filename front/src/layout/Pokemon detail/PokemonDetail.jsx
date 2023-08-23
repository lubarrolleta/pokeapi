import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import CardPokemon from "../Pokemon/show pokemon/CardPokemon";

const PokemonDetail = () => {
  const params = useParams();
  const { data } = useAuth();

  return (
    <>
        {data.favorites.favoritesUsers && (<h5 style={{textAlign: 'center'}}>@{data.favorites.favoritesUsers}</h5>)}
      <section style={{display: 'flex',gap: '10px','flexWrap': 'wrap',justifyContent: 'center'}}>
        {data.favorites &&
          data.favorites.favorites.length > 0 &&
          data.favorites.favorites.map((fav) => <CardPokemon key={fav.id} data={fav} />)}
      </section>
    </>
  );
};

export default PokemonDetail;
