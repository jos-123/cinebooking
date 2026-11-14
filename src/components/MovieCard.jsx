
import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <article className="movie-card">

      <div className="movie-poster-wrapper">

        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
        />

        <span className="movie-rating">
          ★ {movie.rating}
        </span>

      </div>

      <div className="movie-info">

        <h3 className="movie-title">
          {movie.title}
        </h3>

        <p className="movie-genre">
          {movie.genre}
        </p>

        <p className="movie-language">
          {movie.language}
          {movie.duration ? ` · ${movie.duration}` : ""}
        </p>

        <Link
          to={`/book/${movie.id}`}
          className="book-button"
        >
          Book Tickets →
        </Link>

      </div>

    </article>
  );
}

export default MovieCard;
