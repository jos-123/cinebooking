
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Clapperboard } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("cinebook-user") || "null"
      );
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("cinebook-user");
    localStorage.removeItem("cinepalace-user");

    setUser(null);

    alert("You have successfully logged out.");

    navigate("/");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <Clapperboard size={25} />
        <span>CinePalace</span>
      </Link>

      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>

        {user && (
          <NavLink to="/tickets">My Tickets</NavLink>
        )}
      </div>

      <div className="navbar-actions">

        {user ? (
          <>
            <span className="nav-user">
              Hi, {user.name}
            </span>

            <button
              className="register-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="register-button">
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
