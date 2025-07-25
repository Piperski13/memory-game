import { useEffect, useState } from "react";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokeScore, setPokeScore] = useState([]);
  const [scoreBoard, setScoreBoard] = useState(0);

  useEffect(() => {
    const names = ["pikachu", "bulbasaur", "charmander"];

    Promise.all(
      names.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
          res.json()
        )
      )
    ).then((data) => setPokemons(data));
  }, []);

  const onClickHandler = (e, id) => {
    e.preventDefault();
    scoreChecker(id);
    console.log("pokemons : ", pokemons);
    console.log("pokemScore : ", pokeScore);
  };

  const scoreChecker = (id) => {
    if (pokeScore.includes(id)) {
      setScoreBoard(0);
      setPokeScore([]);
    } else {
      setPokeScore((prev) => [...prev, id]);
      setScoreBoard((prev) => prev + 1);
    }
  };

  return (
    <div>
      <h1>Pokémon</h1>
      <h3>Score: {scoreBoard}</h3>
      {pokemons.map((p) => (
        <div onClick={(e) => onClickHandler(e, p.id)} key={p.id}>
          <h2>{p.name}</h2>
          <img src={p.sprites.front_default} alt={p.name} />
        </div>
      ))}
    </div>
  );
};

export default App;
