import { useState } from "react";
import { tempMovieData } from "../Data/tempMovieData";
import { Movie } from "./Movie";

export function MovieList({movies,onSelectMovie}) {

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie onSelectMovie={onSelectMovie} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
