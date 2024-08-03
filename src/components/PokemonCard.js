import { useContext } from "react";
import "../styles/pokemoncard.css";
import "../styles/pokemontypes.css";
import { PokemonContext } from "../context/PokemonContext";
import PokeLogo from "../images/404.webp";
function PokemonCard({ pokemon }) {
  const { getGenerationNumber } = useContext(PokemonContext);
  return (
    <div className="pokemon-card">
      <div className="card-shine"></div>
      <p className="pokemon-id">
        {pokemon.id < 10 ? `No. 0${pokemon.id}` : `No. ${pokemon?.id}`}
      </p>

      <div className={`pokemon-header ${pokemon.types[0].type.name}`}>
        <img
          className={
            pokemon.sprite
              ? "pokemon-sprite"
              : "pokemon-sprite pokemon-nosprite "
          }
          src={pokemon.sprite || PokeLogo}
          alt={pokemon.name}
        ></img>
      </div>
      <div className="pokemon-body">
        <p className="pokemon-name">{pokemon.name}</p>
        <p
          className={`pokemon-gen ${pokemon.types[0].type.name}`}
        >{`GEN-${getGenerationNumber(pokemon.generation)}`}</p>
        <p className="ability-title">Abilities</p>
        <ul className="pokemon-abilities">
          {pokemon.abilities && pokemon.abilities.length > 0
            ? pokemon.abilities.map((ability, i) => {
                return (
                  <li key={`ab-${pokemon.id}-${i}`}>
                    {ability.ability.name.charAt(0).toUpperCase() +
                      ability.ability.name.slice(1)}
                  </li>
                );
              })
            : ""}
        </ul>
        {pokemon.types && pokemon.types.length > 0
          ? pokemon.types.map((typeP, i) => {
              return (
                <p
                  key={`type-${pokemon.id}-${i}`}
                  className={`type ${typeP.type.name}`}
                >
                  {typeP.type.name}
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
}
export default PokemonCard;
