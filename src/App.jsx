import { use } from "react";
import { useEffect, useState } from "react";

// const tempMovieData = [
//   {
//     imdbID: "tt15398776",
//     Title: "Oppenheimer",
//     Year: "2013",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt1517268",
//     Title: "Barbie",
//     Year: "2023",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt8589698",
//     Title: "Teenage Mutant Ninja Turtles: Mutant Mayhem",
//     Year: "2023",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYzE4MTllZTktMTIyZS00Yzg1LTg1YzAtMWQwZTZkNjNkODNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
//   },
// ];

const tempWatchedData = [
  {
    imdbID: "tt15398776",
    Title: "Oppenheimer",
    Year: "2013",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    runtime: 180,
    imdbRating: 8.6,
    userRating: 10,
  },
  {
    imdbID: "tt1517268",
    Title: "Barbie",
    Year: "2023",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    runtime: 114,
    imdbRating: 7.2,
    userRating: 8,
  },
];

const average = (array) => {
  if (array.length === 0) return 0; // Pastikan array tidak kosong
  const total = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return total / array.length;
};

function Logo() {
  return (
    <div className="logo">
      <span role="img">🎫</span>
      <h1>Movie</h1>
    </div>
  );
}

function Search({ search, setSearch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

// movies? adalah optional chaining, digunakan untuk menghindari error ketika movies belum terdefinisi

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function MovieItem({ movie, onSelectMovieId }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovieId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, onSelectMovieId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          onSelectMovieId={onSelectMovieId}
        />
      ))}
    </ul>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>🎬</span>
          <span>{isNaN(avgImdbRating) ? "N/A" : avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{isNaN(avgUserRating) ? "N/A" : avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{isNaN(avgRuntime) ? "N/A" : avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedItem({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🎬</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function BoxMovies({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return (
    <div className="loader">
      <div className="loading-bar">
        <div className="bar"></div>
      </div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span>⛔</span> {message}
    </div>
  );
}

const API_KEY = "9ec8f7e3";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("fast and furious");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleSelectMovieID(id) {
    // console.log(id);
    setSelectedMovieId(id);
  }

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}}`
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        // console.log(data.search);

        setMovies(data.Search);
        // setIsLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (search.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovie();
  }, [search]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search search={search} setSearch={setSearch} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <BoxMovies>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovieId={handleSelectMovieID} />
          )}
        </BoxMovies>
        <BoxMovies>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </BoxMovies>
      </Main>
    </>
  );
}
