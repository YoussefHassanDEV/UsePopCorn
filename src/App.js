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
import { SelectedMovie } from "./SelectedMovie";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const KEY = 'bcdf72c6';
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isloading, SetIsLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [error, setError] = useState("");
  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }
  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) =>
      movie.imdbID !== id));

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
            selectedId ? <SelectedMovie watched={watched} selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} /> :
              <>
                <Summary watched={watched} />
                <WatchedList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
          }
        </Box>
      </Main>
    </>
  );
}


