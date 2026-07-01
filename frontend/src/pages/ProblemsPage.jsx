import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProblemsPage.css";
import API from "../services/api";

import ProblemCard from "../components/ProblemCard";

function ProblemsPage() {

  const [search, setSearch] = useState("");
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("All");
  const [showSolved, setShowSolved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    const fetchProblems = async () => {

      try {
        const response = await API.get(`problems?page=${currentPage}`);

        setProblems(response.data.problems);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);

        const userResponse = await API.get("auth/me",

          {
            headers: {
              Authorization:`Bearer ${localStorage.getItem("token")}`,

            },
          },
        );

        const solvedIds = userResponse.data.solvedProblems.map(
          (problem) => problem._id
        );

        setSolvedProblems(solvedIds);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };

    fetchProblems();

  }, [currentPage]);


  const filteredProblems = problems.filter((problem) => {

    const matchesSearch =
      problem.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === "All" ||
      problem.difficulty === difficulty;

    const matchesSolved =
      !showSolved ||
      solvedProblems.includes(problem._id);

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesSolved
    );

  });

  if (loading) {

    return (

      <div className="skeleton-grid">

        {[...Array(6)].map((_, i) => (

          <div
            key={i}
            className="skeleton-card"
          />

        ))}

      </div>

    );

  }

  return (
    <div className="problems-page page-enter">

      <div className="problems-header">

        <h1>Problems</h1>

        <input
          type="text"
          placeholder="Search Problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="filters">

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >

          <option value="All">
            All Difficulties
          </option>

          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>

        </select>

        <button
          className={showSolved ? "active-filter" : ""}
          onClick={() => setShowSolved(!showSolved)}
        >
          Solved Only
        </button>

      </div>

      <div className="problems-grid">

        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
          <Link
            key={problem._id}
            to={`/problems/${problem._id}`}
            style={{ textDecoration: "none" }}
          >
            <ProblemCard
              title={problem.title}
              difficulty={problem.difficulty}
              tags={problem.tags}
              solved={solvedProblems.includes(problem._id)}
            />
          </Link>
        ))
        ):(
          <div className="empty-state-card">

            <h2>No Problems Found 🔍</h2>

            <p>
              Try changing your search or filters.
            </p>

          </div>
        )
        }

      </div>

      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default ProblemsPage;
