import { useEffect, useState } from "react";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokeScore, setPokeScore] = useState([]);
  const [scoreBoard, setScoreBoard] = useState(0);
  const [pokeFetch, setPokeFetch] = useState(0);

  useEffect(() => {
    const allNames = [
      "pikachu",
      "bulbasaur",
      "charmander",
      "squirtle",
      "eevee",
      "snorlax",
    ];
    const randomNames = allNames.sort(() => 0.5 - Math.random());

    Promise.all(
      randomNames.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
          res.json()
        )
      )
    ).then((data) => setPokemons(data));
  }, [pokeFetch]);

  const onClickHandler = (e, id) => {
    e.preventDefault();
    scoreChecker(id);
  };

  const scoreChecker = (id) => {
    if (pokeScore.includes(id)) {
      setScoreBoard(0);
      setPokeScore([]);
      setPokeFetch((prev) => prev + 1);
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
