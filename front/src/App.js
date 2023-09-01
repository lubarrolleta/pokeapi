import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import { AuthContext } from "./context/AuthContext";
import Modal from "./pages/Modal";
import { useAuth } from "./hooks/useAuth";
import { removeTokens, setTokens } from "./context/localStorage";
import { Crypto } from "./context/Crypto";
import { Querys } from "./context/Querys";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, settitleModal] = useState(null);
  const [contentModal, setcontentModal] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesUsers, setFavoritesUsers] = useState([]);
  const [auth, setAuth] = useState({token:null,id:null});
  const openModal = (show, title, content) => {
    setShowModal(show);
    settitleModal(title);
    setcontentModal(content);
  };
  document.addEventListener("keyup", (e) => {
    e.key === "Escape" && openModal(false, null, null);
  });

  
  const login =  (token) => {
    setTokens(token);
    setAuth(  (prev)=>(
       {
      ...prev,
      token:token,
      id:  new Crypto()
      .decodeToken(token).id
      
    }));
  };
  // logout
  const route = useNavigate();

  const logout = useCallback(() => {
    if(auth){
      removeTokens();
      setAuth({id:null,token:null});
      route('/')
    }
  },[auth,route])
  useEffect( () => {
    (async () => {
      if (window.localStorage.getItem('token')){
        login(window.localStorage.getItem('token'));
        if(window.localStorage.getItem('favorites')){
          setFavorites(JSON.parse(window.localStorage.getItem('favorites')).favorites);
        }else{
          const me = await new Querys().getMe(
            btoa(JSON.stringify({ email: new Crypto()
              .decodeToken(window.localStorage.getItem('token')).email }))
          );
          console.log(me);
          setFavorites(me.data.favorites);
          setFavorites(window.localStorage.setItem('favorites',JSON.stringify({favorites: me.data.favorites})));

        }
      }

    })()
    
    
  }, []);
  const authData = useMemo(()=>({

    data: {
      auth,
      login,
      logout,
      setFavorites,
      favorites: {
        favorites,
        favoritesUsers,
        setFavoritesUsers,
        setFavorites,
      },
    },
    setFavorites,
    modal: {
      openModal,
      showModal,
      titleModal,
      contentModal,
      settitleModal,
    },
  }),[auth,showModal,titleModal,contentModal,favorites,setFavorites,settitleModal,favoritesUsers,logout]) 
  return (
    <>
      <AuthContext.Provider value={authData}>
        <Layout >
          <Outlet></Outlet>
        </Layout>
        <Modal />
      </AuthContext.Provider>
    </>
  );
}

export default App;
