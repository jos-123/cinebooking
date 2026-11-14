
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Clapperboard, Eye, EyeOff } from "lucide-react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Demo login: accept any valid email and 6+ character password
    const user = {
      name: cleanEmail.split("@")[0],
      email: cleanEmail,
    };

    localStorage.setItem("cinebook-user", JSON.stringify(user));
    localStorage.setItem("cinepalace-user", JSON.stringify(user));

    alert("Login Successful! Welcome to CinePalace Theatre.");

    const destination = location.state?.from || "/";

    navigate(destination, { replace: true });
  };

  return (
    <main className="auth-page">
      <div className="auth-card">

        <Link to="/" className="auth-logo">
          <Clapperboard size={30} />
          <span>CinePalace</span>
        </Link>

        <p className="auth-brand-subtitle">
          THE CINEMA EXPERIENCE
        </p>

        <div className="auth-heading">
          <span>WELCOME TO CINEPALACE THEATRE</span>

          <h1>Welcome Back</h1>

          <p>
            Login to continue your cinema experience
            and book your favourite movies.
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="auth-field">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                minLength={6}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <button type="submit" className="auth-submit">
            Login to CinePalace →
          </button>

        </form>

        <p className="auth-note">
          Demo login only. No registration or email verification required.
        </p>

        <Link to="/" className="auth-back">
          ← Back to Home
        </Link>

      </div>
    </main>
  );
}

export default Login;
