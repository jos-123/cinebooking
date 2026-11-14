
import { Link } from "react-router-dom";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">
            YOUR MOVIE EXPERIENCE STARTS HERE
          </span>

          <h1>
            Your Next Movie
            <br />
            Adventure Awaits
          </h1>

          <p>
            Discover amazing movies, explore the latest releases,
            select your favourite seats and book your tickets
            with CineBook.
          </p>

          <Link to="/movies" className="hero-button">
            Explore Movies →
          </Link>
        </div>
      </section>

      {/* POPULAR MOVIES */}
      <section className="popular-section">

        <div className="section-heading">
          <div>
            <span className="section-label">
              NOW SHOWING
            </span>

            <h2>Popular Movies</h2>

            <p className="section-description">
              Find your next favourite movie.
            </p>
          </div>

          <Link to="/movies" className="view-all">
            View All Movies →
          </Link>
        </div>

        {/* MOVIE GRID */}
        <div className="home-movies-grid">

          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <h2>Cine<span>Book</span></h2>

        <p>
          Your destination for unforgettable cinema experiences.
        </p>

        <p className="footer-copy">
          © 2026 CineBook. All rights reserved.
        </p>
      </footer>

    </main>
  );
}

export default Home;
