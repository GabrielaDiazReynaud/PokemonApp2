import "../styles/general.css";
import React, { useContext } from "react";
import { CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SearchMenu from "../components/SearchMenu";
import NotFoundError from "../components/NotFoundError";
import PokemonCard from "../components/PokemonCard";
import { PokemonContext } from "../context/PokemonContext";

function PokemonHome() {
  const { notFound, pokemonOnDisplay, displayPokemon, loading, disabled } =
    useContext(PokemonContext);
  return (
    <div className="home-container">
      <SearchMenu></SearchMenu>
      <div className="card-display">
        {notFound ? (
          <NotFoundError></NotFoundError>
        ) : pokemonOnDisplay && pokemonOnDisplay.length > 0 ? (
          pokemonOnDisplay.map((pokemon, index) => {
            return (
              <PokemonCard
                key={`pokecard-${pokemon.id}-${index}`}
                pokemon={pokemon}
              />
            );
          })
        ) : (
          <div className="progress-container">
            <CircularProgress />
            <p>Catching Pokemon</p>
          </div>
        )}
      </div>
      <div className="load-button">
        <LoadingButton
          onClick={() => {
            displayPokemon();
          }}
          loading={loading}
          disabled={disabled}
          loadingIndicator="Loading…"
          variant="outlined"
        >
          Load more Pokemon
        </LoadingButton>
      </div>
    </div>
  );
}
export default PokemonHome;
