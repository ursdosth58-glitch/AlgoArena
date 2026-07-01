import { Link } from "react-router-dom";
import "./ProblemCard.css";

function ProblemCard({ title, difficulty, tags, solved }) {

  return (
    <div
        className="problem-card-link"
    >
        <div className="problem-card">

            <div className="problem-top">

                <div className="problem-info">

                    <div className="title-row">

                        <h2>{title}</h2>

                        <span className={`difficulty ${difficulty.toLowerCase()}`}>
                            {difficulty}
                        </span>

                    </div>

                
                </div>

                {solved && (
                    <span className="solved-badge">
                    ✅ Solved
                    </span>
                )}

            </div>

            <div className="tags">

                {tags.map((tag, index) => (
                <span key={index} className="tag">
                    {tag}
                </span>
                ))}

            </div>

        </div>
    </div>
  );
}

export default ProblemCard;