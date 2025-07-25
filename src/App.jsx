import { useEffect, useState } from "react";

const POKEMON_NAMES = [
  // Base forms
  "bulbasaur",
  "charmander",
  "squirtle",
  "gastly",

  // Second-stage evolutions
  "kadabra",
  "pidgeotto",
  "machoke",
  "charmeleon",

  // Final evolutions
  "blastoise",
  "gengar",
  "alakazam",
  "snorlax",
];

const getRandomNames = (list, count) =>
  [...list].sort(() => 0.5 - Math.random()).slice(0, count);

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [scoreBoard, setScoreBoard] = useState(0);

  const [bestScore, setBestScore] = useState(() => {
    return Number(localStorage.getItem("bestScore")) || 0;
  });

  useEffect(() => {
    const randomNames = getRandomNames(POKEMON_NAMES, POKEMON_NAMES.length);
    Promise.all(
      randomNames.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
          res.json()
        )
      )
    ).then((data) => setPokemons(data));
  }, [scoreBoard]);

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore);
  }, [bestScore]);

  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      setScoreBoard(0);
      setClickedIds([]);
    } else {
      const newScore = scoreBoard + 1;
      setClickedIds((prev) => [...prev, id]);
      setScoreBoard(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
  };

  const handleResetClick = () => {
    localStorage.clear();
    setScoreBoard(0);
    setClickedIds([]);
    setBestScore(0);
  };

  return (
    <div>
      <h1>Pokémon</h1>
      <h3>Score: {scoreBoard}</h3>
      <h3>Best Score: {bestScore}</h3>
      <button onClick={handleResetClick}>Reset</button>
      {pokemons.map((p) => (
        <div onClick={(e) => handleCardClick(e, p.id)} key={p.id}>
          <h2>{p.name}</h2>
          <img src={p.sprites.front_default} alt={p.name} />
        </div>
      ))}
    </div>
  );
};

export default App;
