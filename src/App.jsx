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
    <div className="flex flex-col justify-start items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Pokémon Logo"
          className="w-48 h-auto mb-4 my-3"
        />
        <h3>Score: {scoreBoard}</h3>
        <h3>Best Score: {bestScore}</h3>
        <button
          onClick={handleResetClick}
          className="px-4 py-2 my-5 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
        {pokemons.map((p) => (
          <div
            onClick={(e) => handleCardClick(e, p.id)}
            key={p.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <img
              src={p.sprites.front_default}
              alt={p.name}
              className="mx-auto mb-2 w-20 h-20"
            />
            <h2 className="text-center capitalize font-semibold text-gray-800">
              {p.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
