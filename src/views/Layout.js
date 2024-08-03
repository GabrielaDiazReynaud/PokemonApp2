import React, { useEffect, useRef, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";
import axios from "axios";

function Layout({ children }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonOnDisplay, setPokemonOnDisplay] = useState([]);
  const [genFilter, setGenFilter] = useState([]);
  const filterPokemons = useRef([]);
  const onDisplay = useRef(0);
  const offset = useRef(0);
  const isFetching = useRef(false);

  /**
   * Extracts the number part from a generation string.
   * @param {*} generation - Generation string
   * @returns {string} - Th extracted number from Generation string
   */
  function getGenerationNumber(generation) {
    const parts = generation.split("-");
    return parts[1].toUpperCase();
  }
  /**
   *Fetches all Pokémon data from the PokéAPI and updates the state.
   *
   * @param {boolean} firstPokemon  [firstPokemon=false] - Indicates if this is the first fetch to display initial Pokémon.
   * @returns {void}
   */
  // const getAllPokemons = function (firstPokemon) {
  //   if (isFetching.current) return;
  //   isFetching.current = true;
  //   axios
  //     .get(
  //       `https://pokeapi.co/api/v2/pokemon?offset=${offset.current}&limit=${20}`
  //     )
  //     .then((response) => {
  //       let pokemonsTmp = [...response?.data?.results];
  //       if (pokemonsTmp.length !== 0) {
  //         let promises = pokemonsTmp.map((pokemon) => {
  //           return axios.get(pokemon.url).then((response) => {
  //             pokemon.name =
  //               pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1);
  //             pokemon.id = response?.data?.id;
  //             pokemon.abilities = response?.data?.abilities;
  //             pokemon.types = response?.data?.types;
  //             pokemon.sprite =
  //               response?.data?.sprites?.other?.home?.front_default;
  //             return axios.get(response.data.species.url).then((resp) => {
  //               pokemon.generation = resp?.data?.generation.name;
  //             });
  //           });
  //         });
  //         Promise.all(promises).then(() => {
  //           if (firstPokemon) {
  //             setPokemonOnDisplay([...pokemonsTmp]);
  //             onDisplay.current = 20;
  //           }
  //           offset.current += 20;
  //           setPokemons((prevPokemons) => [...prevPokemons, ...pokemonsTmp]);
  //           isFetching.current = false;
  //           console.log(pokemonsTmp);
  //         });
  //       } else {
  //         setLoading(false);
  //         isFetching.current = false;
  //       }
  //     });
  // };
  const getAllPokemons = async function (firstPokemon) {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset.current}&limit=20`
      );
      let pokemonsTmp = [...response?.data?.results];

      if (pokemonsTmp.length !== 0) {
        const promises = pokemonsTmp.map(async (pokemon) => {
          try {
            const pokemonData = await axios.get(pokemon.url);
            pokemon.name =
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            pokemon.id = pokemonData.data.id;
            pokemon.abilities = pokemonData.data.abilities;
            pokemon.types = pokemonData.data.types;
            pokemon.sprite = pokemonData.data.sprites.other.home.front_default;

            const speciesData = await axios.get(pokemonData.data.species.url);
            pokemon.generation = speciesData.data.generation.name;
          } catch (error) {
            console.error(`Error fetching data for ${pokemon.name}:`, error);
          }
        });

        await Promise.all(promises);

        if (firstPokemon) {
          setPokemonOnDisplay([...pokemonsTmp]);
          onDisplay.current = 20;
        }
        offset.current += 20;
        setPokemons((prevPokemons) => [...prevPokemons, ...pokemonsTmp]);
        console.log(pokemonsTmp);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      isFetching.current = false;
    }
  };

  /**
   *Function that formats the search input value
   * @returns {string} - Returns formatted search input value
   */
  const searchFormatter = function () {
    let searchTmp = search.trim();
    searchTmp = searchTmp.toLowerCase();
    return searchTmp;
  };

  /**
   *Fetches 1 Pokémon from the PokéAPI and updates the state.
   */
  const getPokemon = function () {
    setNotFound(false);
    onDisplay.current = 0;
    let formattedSearch = searchFormatter();
    setDisabled(true);
    let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${formattedSearch}`;
    const pokemon = {
      url: pokemonUrl,
    };
    axios
      .get(pokemonUrl)
      .then((response) => {
        pokemon.name =
          response?.data?.name.charAt(0).toUpperCase() +
          response?.data?.name.slice(1);
        pokemon.id = response?.data?.id;
        pokemon.abilities = response?.data?.abilities;
        pokemon.types = response?.data?.types;
        pokemon.sprite = response?.data?.sprites?.other?.home?.front_default;
        return axios.get(response?.data?.species?.url);
      })
      .then((resp) => {
        pokemon.generation = resp?.data?.generation?.name;
        if (genFilter.length > 0) {
          let formatGeneration =
            "Generation " + getGenerationNumber(resp?.data?.generation?.name);
          if (genFilter.includes(formatGeneration)) {
            setPokemonOnDisplay([pokemon]);
          } else {
            setNotFound(true);
            setPokemonOnDisplay([]);
          }
        } else {
          setPokemonOnDisplay([pokemon]);
        }
      })
      .catch((error) => {
        console.log("Pokemon not found", error);
        setNotFound(true);
        setPokemonOnDisplay([]);
      });
  };

  /**
   * Function that displays Pokémon on the screen.
   */
  const displayPokemon = function () {
    let pokemonsTmp = [];
    if (filterPokemons.current.length > 0) {
      pokemonsTmp = filterPokemons.current.slice(
        onDisplay.current,
        onDisplay.current + 20
      );
    } else {
      pokemonsTmp = pokemons.slice(onDisplay.current, onDisplay.current + 20);
    }
    setPokemonOnDisplay((prevState) => [...prevState, ...pokemonsTmp]);
    onDisplay.current = onDisplay.current + 20;
    if (filterPokemons.current.length > 0) {
      checkForPokemon(filterPokemons.current);
    } else {
      checkForPokemon(pokemons);
    }
  };

  /**
   *Function that filters Pokémon by generation.
   */
  const filterByGeneration = function () {
    setNotFound(false);
    setDisabled(false);
    setPokemonOnDisplay([]);
    onDisplay.current = 0;
    let filteredTmp = [];
    if (genFilter.length > 0) {
      let formatGeneration = "";
      for (let i = 0; i < pokemons.length; i++) {
        formatGeneration =
          "Generation " + getGenerationNumber(pokemons[i].generation);
        if (genFilter.includes(formatGeneration)) {
          filteredTmp.push(pokemons[i]);
        }
      }
    }
    filterPokemons.current = [...filteredTmp];
    displayPokemon();
  };

  /**
   *Function that Searches for Pokémon and filters the results when the search button is clicked.
   */
  const searchForPokemon = function () {
    if (
      (search !== "" && genFilter.length > 0) ||
      (search !== "" && genFilter.length === 0)
    ) {
      getPokemon();
    } else {
      filterByGeneration();
    }
  };

  /**
   * Performs a check on an array of Pokémon objects to confirm if there are more elements to display.
   * @param {Array<Object>} pokemonArray -The array of Pokémon objects to be checked.
   */
  const checkForPokemon = function (pokemonArray) {
    if (
      pokemonArray.slice(onDisplay.current, onDisplay.current + 20).length === 0
    ) {
      setDisabled(true);
    }
  };

  /**
   * Fetches all Pokémon data on component mount.
   *
   * @function
   * @name useEffect
   * @param {Function} getAllPokemons - Function to fetch Pokémon data.
   * @param {boolean} firstFetch - Indicates whether this is the initial fetch.
   * @returns {void}
   */
  useEffect(() => {
    getAllPokemons(true);
  }, []);

  /**
   * Fetches more Pokémon data when the `pokemons` state changes.
   *
   * @function
   * @name useEffect
   * @param {Function} getAllPokemons - Function to fetch Pokémon data.
   * @param {Array<Object>} pokemons - Array of Pokémon objects.
   * @returns {void}
   */
  useEffect(() => {
    getAllPokemons();
  }, [pokemons]);

  return (
    <PokemonContext.Provider
      value={{
        notFound,
        pokemonOnDisplay,
        displayPokemon,
        loading,
        disabled,
        search,
        setSearch,
        genFilter,
        setGenFilter,
        searchForPokemon,
        getGenerationNumber,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
export default Layout;
