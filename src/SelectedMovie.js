import { useState, useEffect } from "react";
import { KEY } from "./App";
import { Loader } from "./Loader";
import StarRating from "./Stars/StarRating";

export function SelectedMovie({ watched, selectedId, onCloseMovie, onAddWatched }) {
  const [movie, setMovie] = useState({});
  const [isloading, SetIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("")
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedUserrating = watched.find(movie => movie.imdbID
    === selectedId)?.userRating
  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre

  } = movie;
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie();
  }
  useEffect(
    function () {
      async function getMovieDetails() {
        SetIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        SetIsLoading(false);
      }
      getMovieDetails();
    }, [selectedId]);
    

    useEffect(
      function () {
        if (!title) return;
        document.title = `${title}`;
  
        return function () {
          document.title = "usePopcorn";
        };
      },
      [title]
    );
  return (
    <div className="details">

      {isloading ? <Loader /> : <>
        <header>
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

            {!isWatched ? (
              <>
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick=
                    {handleAdd}>
                    + Add to list
                  </button>
                )}
              </>
            ) : (
              <p>You rated with movie {watchedUserrating} 
                 <span>⭐</span>
              </p>
            )
            }
          </div>
          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section></>}
    </div>
  );
}
