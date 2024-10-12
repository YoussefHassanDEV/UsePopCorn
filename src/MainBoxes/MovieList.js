import { useState } from "react";
import { tempMovieData } from "../Data/tempMovieData";
import { Movie } from "./Movie";

export function MovieList({movies}) {

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
