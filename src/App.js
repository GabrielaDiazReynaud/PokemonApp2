import Layout from "./views/Layout";
import Navbar from "./components/Navbar";
import PokemonHome from "./views/PokemonHome";
function App() {
  return (
    <div>
      <Layout>
        <Navbar></Navbar>
        <PokemonHome></PokemonHome>
      </Layout>
    </div>
  );
}

export default App;
