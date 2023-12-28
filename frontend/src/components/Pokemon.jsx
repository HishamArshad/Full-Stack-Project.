import React, { useState } from 'react';
import { useGetPokemonByNameQuery } from './api/apiSlice';

function Pokemon() {
  const [pokemonName, setPokemonName] = useState('pikachu');
  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
        {console.log(data)}
      {Array.isArray(data) ? ( // Check if data is an array
        data.map((pokemon) => (
          <div key={pokemon.id}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_shiny_female} alt={pokemon.name} />
          </div>
        ))
      ) : (
        <div>
          <h1>{data.name}</h1>
          <img src={data.sprites.front_default} alt={data.name} />
        </div>
      )}
    </div>
  );
}

export default Pokemon;
