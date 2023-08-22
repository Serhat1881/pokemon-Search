import React, { useState, useEffect } from 'react';
import './app.css';

const pokemon_count = 151;

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

const App = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const handleSearchToggle = () => {
    setSearchActive(!searchActive);
  };

  const handleSearchInput = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchValue(searchValue);

    const filtered = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue)
    );
    setFilteredPokemon(filtered);
  };

  const fetchPokemons = async () => {
    const pokemons = await Promise.all(
      Array.from({ length: pokemon_count }, (_, i) => getPokemon(i + 1))
    );
    setPokemonData(pokemons);
    setFilteredPokemon(pokemons);
  };

  const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="App">
        <h1>Pokemon Search</h1>
        <div className={`search ${searchActive ? 'active' : ''}`}>
          <input
            type="text"
            className="searchInput"
            placeholder="Search Pokemon"
            value={searchValue}
            onChange={handleSearchInput}
          />
          <button className="searchBtn" onClick={handleSearchToggle}>
            &#128269;
          </button>
        </div>
      <div className="poke-container">
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon"
            style={{ backgroundColor: bg_color[pokemon.types[0].type.name] }}
          >
            <div className="img-container">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={`${pokemon.name} sprite`}
              />
            </div>
            <div className="poke-info">
              <span className="poke-id">
                #{pokemon.id.toString().padStart(3, '0')}
              </span>
              <h3 className="poke-name">{pokemon.name}</h3>
              <div className="small">
                <small className="poke-exp">
                  <i className="fa solid fa-flask"></i> {pokemon.base_experience}
                </small>
                <small className="poke-weight">
                  <i className="fa solid fa-flask"></i> {pokemon.weight}kg
                </small>
              </div>
              <div className="poke-type">
                <i className="fa-brands fa-uncharted"></i>{' '}
                {pokemon.types[0].type.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;