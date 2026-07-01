import { useEffect, useState } from "react";
import API from "../services/api";

import axios from "axios";
import "./DashboardPage.css";


function DashboardPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchSubmissions = async () => {

      try {

        const response = await API.get("/submissions/my",

          {

            headers: {

              Authorization:`Bearer ${localStorage.getItem("token")}`,

            },

          }

        );

        setSubmissions(response.data);

      } catch (error) {

        console.log(error);

      } finally{
        setLoading(false);
      }

    };

    fetchSubmissions();

  }, []);

  const totalSubmissions = submissions.length;

  const acceptedSubmissions = submissions.filter(
    (sub) => sub.verdict === "Accepted"
  ).length;

  const easySolved = submissions.filter(
    (sub) => sub.problem.difficulty === "Easy" && sub.verdict === "Accepted"
  ).length;

  const mediumSolved = submissions.filter(
    (sub) => sub.problem.difficulty === "Medium" && sub.verdict === "Accepted"
  ).length;

  const hardSolved = submissions.filter(
    (sub) => sub.problem.difficulty === "Hard" && sub.verdict === "Accepted"
  ).length;


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
    <div className="dashboard page-enter">

      <div className="dashboard-content">

        <h1>Dashboard</h1>

        <div className="stats-grid">

          <div className="stat-card">
            <h2>Total Submissions</h2>
            <p>{totalSubmissions}</p>
          </div>

          <div className="stat-card">
            <h2>Accepted</h2>
            <p>{acceptedSubmissions}</p>
          </div>

          <div className="stat-card">
            <h2>Global Rank</h2>
            <p>#4821</p>
          </div>

          <div className="stat-card easy-card">

            <h2>Easy Solved</h2>

            <p>{easySolved}</p>

          </div>

          <div className="stat-card medium-card">

            <h2>Medium Solved</h2>

            <p>{mediumSolved}</p>

          </div>

          <div className="stat-card hard-card">

            <h2>Hard Solved</h2>

            <p>{hardSolved}</p>

          </div>

          

        </div>

        <div className="recent-activity">

          <h2>Recent Activity</h2>

          <div className="activity-list">

            {submissions.slice(0, 5).map((submission) => (

              <div
                key={submission._id}
                className="activity-card"
              >

                <h3>
                  {submission.problem.title}
                </h3>

                <p>
                  Verdict: {submission.verdict}
                </p>

              </div>

            ))}

          </div>

        </div>

        <div className="submission-history">

          <h2>Recent Submissions</h2>

          <table>

            <thead>

              <tr>

                <th>Problem</th>

                <th>Verdict</th>

                <th>Runtime</th>

              </tr>

            </thead>

            <tbody>

              {submissions.length > 0 ? (
                
                submissions.map((submission) => (

                  <tr key={submission._id}>
                    <td>{submission.problem.title}</td>
                    <td>{submission.verdict}</td>
                    <td>{submission.runtime}</td>
                  </tr>

                ))
              ):(
                <tr>

                  <td
                    colSpan="3"
                    className="empty-state"
                  >

                    No submissions yet 🚀

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;