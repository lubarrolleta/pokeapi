import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import PokemonDetail from "./layout/Pokemon detail/PokemonDetail";
import Pokemons from "./layout/Pokemon/Pokemons";
import Users from "./pages/users/Users";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<App />}>
          <Route index element={<Pokemons/>}/>
          <Route path='*' element={<>NOT FOUNT</>}></Route>
          <Route path='/pokemon' element={<Pokemons/>}>
          </Route>
          <Route path='/pokemon/:id' element={<PokemonDetail />}></Route>
          <Route path='/users' element={<Users/>}/>
        </Route>
      </Routes>
    </HashRouter>
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
