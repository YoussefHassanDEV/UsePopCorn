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
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = 'bcdf72c6';
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isloading, SetIsLoading] = useState(false)
  const Tempquery = "Batman"
  const [error, SetError] = useState('')
  useEffect(function () {
    async function fetchMovies() {
      try {
        SetIsLoading(true)
        SetError('');
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok)
          throw new Error("Something Went Wrrong with Fetching");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search)
        SetIsLoading(false)
      }
      catch (err) {
        SetError(err.messsage);
      }
      finally {
        SetIsLoading(false);
      }
    }
    fetchMovies();
  },
    [query])
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>

      <Main>
        {isloading && <Loader />}
        {!isloading && !error && <MovieList movies={movies} />}
        {error && <ErrorMessage message={error} />}
        <Box>
          <Summary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}


function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  )

}