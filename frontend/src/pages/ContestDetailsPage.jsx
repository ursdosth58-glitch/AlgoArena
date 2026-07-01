import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import "./ContestDetailsPage.css";
import LoadingScreen from "../components/LoadingScreen";


const ContestDetailsPage = () => {

  const { id } = useParams();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");


  useEffect(() => {

    const fetchContest = async () => {

      try {

        const res = await API.get(`/contests/${id}`
        );

        setContest(res.data);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      } finally {
        setLoading(false);
      }

    };

    fetchContest();

  }, [id]);

  useEffect(() => {

    if (!contest) return;

    const interval = setInterval(() => {

        const now = new Date().getTime();

        const start = new Date(
            contest.startTime
        ).getTime();

        const end = new Date(
            contest.endTime
        ).getTime();

        if (now < start) {

            const distance = start - now;

            const hours = Math.floor(
                distance / (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) /
                (1000 * 60)
            );

            const seconds = Math.floor(
                (distance % (1000 * 60)) /
                1000
            );

            setTimeLeft(
                `Starts in ${hours}h ${minutes}m ${seconds}s`
            );

        }

        else if (now >= start && now <= end) {

            const distance = end - now;

            const hours = Math.floor(
                distance / (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) /
                (1000 * 60)
            );

            const seconds = Math.floor(
                (distance % (1000 * 60)) /
                1000
            );

            setTimeLeft(
                `Ends in ${hours}h ${minutes}m ${seconds}s`
            );

        }

        else {
            setTimeLeft("Contest Ended");
        }

    }, 1000);

    return () => clearInterval(interval);

  }, [contest]);


  if (loading) {

    return <LoadingScreen />;

  }


  return (

    <div className="contest-details-page page-enter">

      <div className="contest-details-card">

        <h1>{contest.title}</h1>

        <div className="contest-timer">
            {timeLeft}
        </div>

        <p className="contest-description">
          {contest.description}
        </p>

        <div className="contest-dates">

          <p>
            Start:
            {" "}
            {new Date(
              contest.startTime
            ).toLocaleString()}
          </p>

          <p>
            End:
            {" "}
            {new Date(
              contest.endTime
            ).toLocaleString()}
          </p>

        </div>


        <div className="contest-problems">

          <h2>Problems</h2>

          <div className="contest-problem-list">

            {contest.problems.map((problem) => (

              <Link
                key={problem._id}
                to={`/problems/${problem._id}`}
                className="contest-problem-card"
              >

                <h3>{problem.title}</h3>

                <span
                  className={`difficulty ${problem.difficulty.toLowerCase()}`}
                >
                  {problem.difficulty}
                </span>

              </Link>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

};

export default ContestDetailsPage;