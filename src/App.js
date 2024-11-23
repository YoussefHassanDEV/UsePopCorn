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
import { Loader } from "./Loader";
import { useMovies } from "./usemovies";
import { ErrorMessage } from "./ErrorMessage";
import { SelectedMovie } from "./SelectedMovie";
import { useLocalStorageState } from "./useLocalStorageState";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const KEY = 'bcdf72c6';

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }


  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (<MovieList movies={movies} onSelectMovie={handleSelectMovie} />)}
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