import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Crypto } from "../../context/Crypto";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useAuth();
  const [datos, setDatos] = useState(null);
  useEffect(() => {
    setDatos(
      data.auth.token ? new Crypto().decodeToken(data.auth.token) : null
    );
  }, [data]);
  return (
    <nav>
      <Link to={'/'}>
      <h1 style={{ textAlign: "center" }}>POKEAPI NEW</h1>
      </Link>
      {data.auth.token && datos && (
        <section>
          <h2 style={{ textAlign: "center" }}>hola @{datos?.name}</h2>
          <Link onClick={()=>{ 
            data.favorites.setFavorites(JSON.parse(window.localStorage.getItem('favorites')).favorites);
            data.favorites.setFavoritesUsers(null);
            }} to={"/pokemon/" + datos?.id} style={{ textAlign: "center" ,display:'block'}}>IR A MIS POKEMONS FAVORITOS</Link>
          <Link style={{ textAlign: "center" ,display:'block'}} to={'/users'}>VER POKEMONS DE OTROS USERS</Link>
        </section>
      )}
    </nav>
  );
};

export default Header;
