import { Navbar } from "./navigationBar/Navbar";
import { Main } from "./MainBoxes/Main.1";
import { Numresults } from "./navigationBar/Numresults";
import { Logo } from "./navigationBar/Logo";
import { Search } from "./navigationBar/Search.1";
import { useState } from "react";
import {MovieList} from "./MainBoxes/MovieList"
import { Box } from "./MainBoxes/Box";
import {Summary} from "./MainBoxes/Summary"
import {WatchedList} from "./MainBoxes/WatchedList"
import { tempMovieData } from "./Data/tempMovieData";
import { tempWatchedData } from "./Data/tempWatchedData";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {

  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);


  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <Numresults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <Summary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

