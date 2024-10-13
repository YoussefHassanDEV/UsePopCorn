import StarRating from "../Stars/StarRating";

export function Movie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
      <span><StarRating size={20} messages={["Bad", "Normal", "Good", "V.Good", "Excelent"]} /></span>

    </li>
  );
}
