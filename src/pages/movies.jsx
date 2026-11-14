
import { useState } from "react";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard";
import "./movies.css";

export default function Movies() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  const genres = [
    "All",
    "Action",
    "Sci-Fi",
    "Adventure",
    "Fantasy",
    "Crime",
    "Thriller",
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      genre === "All" ||
      movie.genre.toLowerCase().includes(genre.toLowerCase());

    return matchesSearch && matchesGenre && movie.poster;
  });

  return (
    <main className="movies-page">
      <section className="movies-header">
        <span className="movies-eyebrow">THE CINEMA COLLECTION</span>
        <h1>Discover Your Next Movie</h1>
        <p>Choose your movie. Select your seats. Enjoy the show.</p>

        <div className="movies-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search your favourite movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="movies-content">
        <div className="movies-toolbar">
          <div>
            <h2>Now Showing</h2>
            <p>{filteredMovies.length} movies available</p>
          </div>

          <div className="genre-filters">
            {genres.map((item) => (
              <button
                key={item}
                className={genre === item ? "genre-active" : ""}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredMovies.length > 0 ? (
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="movies-empty">
            <h2>No movies found</h2>
            <p>Try another search or genre.</p>
            <button onClick={() => {
              setSearch("");
              setGenre("All");
            }}>
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
