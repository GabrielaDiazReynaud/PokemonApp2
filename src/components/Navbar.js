import React from "react";
import "../styles/navbar.css";
import PokeLogo from "../images/pokelogo.png";
function Navbar() {
  return (
    <div className="navbar">
      <a href="#root">
        <img className="pokelogo" src={PokeLogo} alt="pokeball-logo" />
      </a>
    </div>
  );
}
export default Navbar;
