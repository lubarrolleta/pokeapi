import React, { useEffect, useState } from "react";
import { Querys } from "../../context/Querys";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const {data} = useAuth();
  useEffect(() => {
    (async () => {
      const users = await new Querys().getUsers();
      setUsersData(users.status === 200 ? users.data : []);
    })();
  }, []);
  return (
    <section className='contenedor__users' style={{width:'80%',margin:'0 auto'}}>
      {usersData.length > 0 &&
        usersData.map((users) => (
          <div key={users["_id"]}>
            <Link to={"/pokemon/" + users["_id"]} onClick={() =>{
                
                 data.favorites.setFavorites(users.favorites);
                 data.favorites.setFavoritesUsers(users.name);
            }}>
              <h5>{users.name}</h5>
            </Link>
            <aside>
              {users.favorites.map((img) => (
                <img
                  style={{ width: "50px" }}
                  key={img.id}
                  src={img.poster}
                  alt={img.name}
                />
              ))}
            </aside>
          </div>
        ))}
    </section>
  );
};

export default Users;
