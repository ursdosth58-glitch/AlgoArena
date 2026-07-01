import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  return (
    <div className="home page-enter">
      
      <section className="hero">
        {user && <h1>Hello {user.name}</h1>}

        <h2>Master DSA with AlgoArena</h2>

        <p>
          Practice coding problems, participate in contests,
          and improve your problem-solving skills.
        </p>

        <div className="hero-buttons">
          <Link to="/login">
            {!user &&  <button> Get Started </button> }
          </Link>

          <Link to="/problems">
            <button>
              Explore Problems
            </button>
          </Link>
        </div>
      </section>

      <section className="features">
        
        <div className="feature-card">
          <h2>1000+ Problems</h2>

          <p>
            Solve curated DSA problems from easy to hard.
          </p>
        </div>

        <div className="feature-card">
          <h2>Live Contests</h2>

          <p>
            Compete with other coders in real-time contests.
          </p>
        </div>

        <div className="feature-card">
          <h2>Track Progress</h2>

          <p>
            Analyze your performance and improve consistently.
          </p>
        </div>

      </section>
    </div>
  );
}

export default HomePage;