import { Navbar } from "./navigationBar/Navbar";
import { Main } from "./MainBoxes/Main.1";
import { Numresults } from "./navigationBar/Numresults";
import { Logo } from "./navigationBar/Logo";
import { Search } from "./navigationBar/Search.1";
import { useEffect, useState } from "react";
import { MovieList } from "./MainBoxes/MovieList"
import { Box } from "./MainBoxes/Box";
import { Summary } from "./MainBoxes/Summary"
import { WatchedList } from "./MainBoxes/WatchedList"
import { tempMovieData } from "./Data/tempMovieData";
import { tempWatchedData } from "./Data/tempWatchedData";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import StarRating from "./Stars/StarRating";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = 'bcdf72c6';
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isloading, SetIsLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  // const Tempquery = "Batman"
  const [error, setError] = useState("");
  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          SetIsLoading(true)
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok)
            throw new Error("Something Went Wrong with Fetching");
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search)
          setError("");
        }
        catch (err) {
          setError(err.message);
        }
        finally {
          SetIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();

    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isloading && <Loader />}
          {!isloading && !error && (<MovieList movies={movies} onSelectMovie={handleSelectMovie} />)}
          {error && <ErrorMessage message={error} />}</Box>

        <Box>

          {
            selectedId ? <SelectedMovie selectedId={selectedId} onCloseMovie={handleCloseMovie} /> :
              <>
                <Summary watched={watched} />
                <WatchedList watched={watched} />
              </>
          }
        </Box>
      </Main>
    </>
  );
}


function SelectedMovie({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isloading, SetIsLoading] = useState(false);
  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime,
    imdbRating, Plot: plot, Released: released, Actors: actors,
    Director: director, Genre: genre

  } = movie
  useEffect(function () {
    async function getMovieDetails() {
      SetIsLoading(true)
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data)
      SetIsLoading(false)
    }
    getMovieDetails()
  }, [selectedId])
  return (
    <div className="details">

      {isloading ? <Loader /> : <>  <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movie}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>{released} &bull; {runtime}</p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating}</p>
        </div>
      </header>
        <section>
          <div className="rating">
            <StarRating maxRating={10} size={24} />
          </div>
          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section></>}
    </div>
  );
}