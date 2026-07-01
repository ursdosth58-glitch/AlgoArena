import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {

  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleTheme = () => {

    if (theme === "dark") {

      document.body.classList.add(
        "light-theme"
      );

      setTheme("light");

    } else {

      document.body.classList.remove(
        "light-theme"
      );

      setTheme("dark");

    }

  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      
      <Link 
        to="/" 
        className="logo-link"
      >
        <h2>AlgoArena</h2>
      </Link>

      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div 
        className={`nav-links ${
          menuOpen ? "mobile-open" : ""
        }`}
      >
        <Link 
          to="/" onClick={() => 
          setMenuOpen(false)} 
        >
          Home
        </Link>

        <Link 
          to="/problems"
          onClick={() => setMenuOpen(false)}
        >
          Problems
        </Link>

        {!user?
          (
            <>
              <Link 
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                  Login
              </Link>

              <Link 
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>

          ):(

            <>
              <Link 
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link 
                to="/contests"
                onClick={() => setMenuOpen(false)}
              >
                Contests
              </Link>

              <Link 
                to="/my-submissions"
                onClick={() => setMenuOpen(false)}
              >
                My Submissions
              </Link>

              {
                user?.role === "admin" &&
                <Link 
                  to="/add-problem"
                  onClick={() => setMenuOpen(false)}
                >
                  Add Problems
                </Link>
              }

              <Link
                to="/profile"
                className="profile-link"
                onClick={() => setMenuOpen(false)}
              >
                👤 Profile
              </Link>

              <button 
                className="theme-toggle"
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
              >
                {theme === "dark"? "☀️" : "🌙"}
              </button>
              
              <button onClick={handleLogout}>
                Logout
              </button>
            </>

          )
        }
      </div>
    </nav>
  );
}

export default Navbar;

