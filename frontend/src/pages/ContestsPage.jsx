import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ContestsPage.css";
import API from "../services/api";


const ContestsPage = () => {

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchContests = async () => {

      try {

        const res = await API.get("/contests"
        );

        setContests(res.data);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      }

    };

    fetchContests();

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

    <div className="contests-page page-enter">

      <div className="contests-header">

        <h1>Contests</h1>

      </div>

      <div className="contests-grid">

        {contests.length > 0 ? (
          contests.map((contest) => (

            <Link
              key={contest._id}
              to={`/contests/${contest._id}`}
              className="contest-link"
            >

              <div className="contest-card">

                <h2>{contest.title}</h2>

                <p>{contest.description}</p>

                <div className="contest-time">

                  <span>
                    Start:
                    {" "}
                    {new Date(
                      contest.startTime
                    ).toLocaleString()}
                  </span>

                  <span>
                    End:
                    {" "}
                    {new Date(
                      contest.endTime
                    ).toLocaleString()}
                  </span>

                </div>

              </div>

            </Link>

          ))
        ):(
          <div className="empty-state-card">

            <h2>No Contests Available 🏆</h2>

            <p>
              New contests will appear here.
            </p>

          </div>
        )

        }

      </div>

    </div>

  );

};

export default ContestsPage;