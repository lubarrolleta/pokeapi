import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { Crypto } from "../../context/Crypto.js";
import { URLAPIREST } from "../../Constants/constantes.js";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth.js";
import { Querys } from "../../context/Querys.js";
import { AuthContext } from "../../context/AuthContext.js";

const Login = (props) => {
  const { pokemon } = props;
  const [isLogin, setIsLogin] = useState(true);
  const [reload, setReload] = useState(false);
  const [messErr, setMessErr] = useState(null);
  const form = useRef("");
  const { data, modal } = useAuth();

  useEffect(() => {
    setReload(false);
  }, [reload]);
  const postLogin = async (data) => {
    try {
      const config = {
        url: URLAPIREST + "/login",
        method: "POST",
        headers: {
          // 'Content-Type': 'application/json; charset=utf-8'
        },
        data: JSON.stringify(data),
      };
      const consulta = await axios(config);
      // console.log(consulta.data);
      return consulta.data;
    } catch (error) {
      console.error(error);
      return error?.response;
    }
  };
  const onSubmitUser = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form.current));

    console.log(btoa(JSON.stringify(formData)));
    // console.log(formData);
    if (
      formData.name.length !== 0 &&
      formData.email.length !== 0 &&
      formData.pass.length !== 0 &&
      pokemon
    ) {
      formData.favorites = [pokemon];
      formData.pass = await new Crypto().EncryptPassword(formData.pass);
      const consult = await createUser(formData);
      //   console.log(consult);
      if (consult?.status === 200) {
        data.login(consult.data.data.token);
        console.log(data.auth);
        modal.openModal(false, null, null);
        const me = await new Querys().getMe(
          btoa(JSON.stringify({ email: consult.data.data.email }))
        );
        console.log(me);
        if(me.status === 200) {
            const favorites = me.data.favorites;
          data.favorites.setFavorites([...favorites]);
          window.localStorage.setItem(
            "favorites",
            JSON.stringify({ favorites: [...favorites] })
          );
        }
      }
    }
  };
  const createUser = async (data) => {
    // console.log(data);
    try {
      const config = {
        url: URLAPIREST + "/login/register",
        method: "POST",
        headers: {},
        data: btoa(JSON.stringify(data)),
      };
      const consulta = await axios(config);
      //   console.log(consulta);
      return consulta;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const formData = Object.fromEntries(new FormData(form?.current));
    if (formData.email.length !== 0 && formData.pass.length !== 0) {
      const consulta = await postLogin(formData);
      if (consulta?.status === 401) {
        console.log("contrasena mal", consulta.data);
        setMessErr(consulta.data);
        // return;
      } else if (consulta?.status === 406) {
        console.log("usuer no creado");
        setIsLogin(consulta?.status === 406 ? false : true);
        modal.settitleModal("Register");
        formData.favorites = [pokemon];
        setMessErr(consulta.data);

        // setReload(true);
        // return;
      } else if (consulta?.status === 200) {
        await modal.openModal(false, null, null);
        await data.login(consulta.data.token);
        const me = await new Querys().getMe(
          btoa(JSON.stringify({ email: consulta?.data.email }))
        );
        // console.log(me.data.favorites);
        if (me?.status === 200) {
          const favorites = me.data.favorites;
          data.favorites.setFavorites([...favorites]);
          window.localStorage.setItem(
            "favorites",
            JSON.stringify({ favorites: [...favorites] })
          );
        } else {
          window.localStorage.setItem(
            "favorites",
            JSON.stringify({ favorites: [] })
          );
        }
      }
    }
  };
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e, data);
      }}
      name='login'
      ref={form}
      style={{ display: "flex", flexDirection: "column" }}>
      <input type='email' name='email' id='email' />
      <input
        type='text'
        hidden={isLogin}
        name='name'
        id='name'
        placeholder='Your Name'
      />
      <input type='password' name='pass' id='pass' />
      <input
        type='button'
        value={isLogin ? "login" : "register"}
        onClick={isLogin ? onSubmit : onSubmitUser}
      />
      {messErr && <p>{messErr.message}</p>}
    </form>
  );
};

export default Login;
