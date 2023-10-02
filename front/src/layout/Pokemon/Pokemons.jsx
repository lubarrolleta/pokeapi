import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { URLAPIREST } from '../../Constants/constantes';
import ShowPokemon from './show pokemon/ShowPokemon';

const Pokemons = () => {
    const [data, setData] = useState(undefined);
    const {search} = useLocation();
    const consulta = async()=>{
        try {
            const getPokemons = await fetch(URLAPIREST+'/pokemon'+search);
            const dataPokemons = await getPokemons.json();
            // console.log(dataPokemons,'dataPokemons')
            setData(dataPokemons.status=== 200 ? dataPokemons: false);
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    useEffect(() => {
        consulta()
    }, [search]);
    if (data === false){
        window.location.reload();
    }
    return (
        <>
        {!data ? <h1>LOADIND</h1> : <ShowPokemon data={data}/>}
        
        </>
    );
}

export default Pokemons;
