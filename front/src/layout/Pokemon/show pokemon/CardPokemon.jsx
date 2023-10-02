import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { useAuth } from "../../../hooks/useAuth";
import Login from "../../../pages/Auth/Login";
import { Querys } from "../../../context/Querys";

const CardPokemon = (props) => {
  console.log(props)
  const { name, poster, url } = props.data;
  const { modal, data } = useAuth();
  
  const addFavorite = async (data, array,logout) => {
    const favorites =
      array.favorites ||
      JSON.parse(window.localStorage.getItem("favorites")).favorites;
   
    if (!favorites.find((item) => item.id === data.id)) {
      console.log("no esta");
      array.setFavorites([...favorites, data]);
      window.localStorage.setItem(
        "favorites",
        JSON.stringify({ favorites: [...favorites, data] })
      );
      
     const consulta = await new Querys().postFavorites(window.localStorage.getItem("favorites"));
     console.log(consulta);
     if(consulta.status === 500){
        console.log(consulta.message);
        console.log(logout);
        logout.logout();
     }
    }
  };
  return (
    // <Link to={url}>
    <div className='cardPokemon' style={{padding: '5px'}}>
      <h3 style={{textAlign: 'center'}}>{name}</h3>
      <img src={poster} alt={name} />
      <FcLike
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (!data.auth.id) {
            modal.openModal(true, "login", <Login pokemon={props.data} />);
            return;
          } else {
            addFavorite(props.data, data.favorites,data);
            return;
          }
        }}></FcLike>
    </div>
    // </Link>
  );
};

export default CardPokemon;
