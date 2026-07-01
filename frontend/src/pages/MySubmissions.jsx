import { useEffect, useState } from "react";
import "./MySubmissions.css";
import API from "../services/api";

function MySubmissions() {

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchSubmissions = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await API.get("/submissions/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSubmissions(response.data);

      } catch (error) {

        console.log(error);
      } finally {
        setLoading(false)
      }
    };

    fetchSubmissions();

  }, []);

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

    <div className="page-container page-enter">

      <h1>My Submissions</h1>

      {
        submissions.length === 0 ? (

          <p>No submissions yet</p>

        ) : (

          <table className="submission-table">

            <thead>

              <tr>

                <th>Problem</th>

                <th>Language</th>

                <th>Verdict</th>

                <th>Runtime</th>

                <th>Submitted At</th>

              </tr>

            </thead>

            <tbody>

              {
                submissions.map((submission) => (

                  <tr key={submission._id}>

                    <td>
                      {submission.problem?.title}
                    </td>

                    <td>
                      {submission.language}
                    </td>

                    <td>
                      {submission.verdict}
                    </td>

                    <td>
                      {submission.runtime}
                    </td>

                    <td>
                      {
                        new Date(
                          submission.createdAt
                        ).toLocaleString()
                      }
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>
        )
      }

    </div>
  );
}

export default MySubmissions;