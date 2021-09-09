import React from "react";
import create from "zustand";

export default function TestStore() {
  const useStore = create((set) => ({
    pokemons: [
      { id: 1, name: "Bulbasaur" },
      { id: 2, name: "Ivysaur" },
      { id: 3, name: "Venusaur" },
      { id: 4, name: "Charmander" },
      { id: 5, name: "Charmeleon" },
    ],
    addPokemons: (pokemon) =>
      set((state) => ({
        pokemons: [
          { name: pokemon.name, id: Math.random() * 100 },
          ...state.pokemons,
        ],
      })),
    removePokemon: (id) =>
      set((state) => ({
        pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
      })),
  }));

  const pokemons = useStore((state) => state.pokemons);
  const removePokemon = useStore((state) => state.removePokemon);
  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <div className="row">
                <div className="col-md-6">{pokemon.name} </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={(e) => removePokemon(pokemon.id)}
                  >
                    X
                  </button>
                  {console.log(pokemons)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
}
