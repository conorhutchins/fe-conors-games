import { useState } from "react";
import { voteOnReview } from "../api";
import "../styles/reviewVoting.css";

const ReviewVoting = ({ reviewId, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = (increment) => {
    setIsSubmitting(true);
    setVotes((prevVotes) => (increment ? prevVotes + 1 : prevVotes - 1));
    setError(null);
  
    voteOnReview(reviewId, increment)
      .then(( response ) => {
        if (response.votes !== undefined) {
          setVotes(response.votes);
          setIsSubmitting(false);
          setError(null);
        } else {
          throw new Error("Failed to vote. Please try again.");
        }
      })
      .catch((error) => {
        setError(error.message);
        setVotes((prevVotes) => (increment ? prevVotes - 1 : prevVotes + 1));
        setIsSubmitting(false);
      });
  };

  return (
    <section className="review-voting">
      <p className="vote-count">Votes: {votes}</p>
      <div className="vote-buttons">
        <div className="vote-button">
          <button onClick={() => handleVote(true)} disabled={isSubmitting}>
            👍
          </button>
        </div>
        <div className="vote-button">
          <button onClick={() => handleVote(false)} disabled={isSubmitting}>
            👎
          </button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default ReviewVoting;