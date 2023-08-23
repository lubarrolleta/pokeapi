import React from 'react';
import CardPokemon from './CardPokemon';
import { Link, useLocation } from 'react-router-dom';

const ShowPokemon = (props) => {
    const {data} = props;
    const botones = {
        botones:[
           
            {btn:{
                title: 'previous',
                url:data.data.previous
            }},
            {btn:{
                title: 'next',
                url:data.data.next
            }},
        ]
    }; 
    // const location = useLocation();
    // console.log(location);
    // console.log(botones.botones);
    return (
        <>
        <div className="contenedor__pokemons" style={{display: 'flex',gap: '10px','flexWrap': 'wrap',justifyContent: 'center'}}>
            {data.data !== null && data.data.results.map((result) => <CardPokemon key={result.id} data={result}/>)}
        </div>
        <section className='contenedor__botones' style={{display: 'flex',justifyContent: 'center',gap: '10px'}}>
        {data && botones.botones.map((btn,i)=> (<Link key={i} to={btn.btn.url}><button>{btn.btn.title}</button></Link>))}
        </section>
        </>
    );
}

export default ShowPokemon;
