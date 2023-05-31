import { useState } from "react";
import { voteOnReview } from "../api";

const ReviewVoting = ({ reviewId, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = (increment) => {
    setIsSubmitting(true);
    voteOnReview(reviewId, increment)
      .then((response) => {
        setVotes(response.data.votes);
        setIsSubmitting(false);
        setError(null);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError("Failed to vote. Please try again.");
      });
  };

  return (
    <section className="review-voting">
      <p className="vote-count">Votes: {votes}</p>
      <div className="vote-buttons">
        <button onClick={() => handleVote(true)} disabled={isSubmitting}>
          Vote Up
        </button>
        <button onClick={() => handleVote(false)} disabled={isSubmitting}>
          Vote Down
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default ReviewVoting;
