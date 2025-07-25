import { useEffect, useState } from "react";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokeScore, setPokeScore] = useState([]);
  const [scoreBoard, setScoreBoard] = useState(0);

  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem("bestScore");
    const initialValue = JSON.parse(saved);
    return initialValue || 0;
  });

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
  }, [scoreBoard]);

  const onClickHandler = (e, id) => {
    e.preventDefault();
    scoreChecker(id);
  };

  const scoreChecker = (id) => {
    if (pokeScore.includes(id)) {
      setScoreBoard(0);
      setPokeScore([]);
    } else {
      const newScore = scoreBoard + 1;
      setPokeScore((prev) => [...prev, id]);
      setScoreBoard(newScore);

      setBestScore((prev) => {
        const updated = newScore > prev ? newScore : prev;
        localStorage.setItem("bestScore", JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <div>
      <h1>Pokémon</h1>
      <h3>Score: {scoreBoard}</h3>
      <h3>Best Score: {bestScore}</h3>
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
