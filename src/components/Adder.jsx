import { useState } from "react";
import { postCommentForAReviewId } from "../api";
import "../styles/adder.css"

const Adder = ({ reviewId }) => {
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!author || !body) {
      setError("Please fill out all the required fields.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const commentData = {
      author: author,
      body: body,
      votes: 0,
    };

    postCommentForAReviewId(reviewId, commentData)
      .then((comment) => {
        setSuccess(true);
        setAuthor("");
        setBody("");
        setIsSubmitting(false);
        setError(null);
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Failed to post comment. Please try again.");
        }
      });
  };

  return (
    <div className="adder-container">
      <h2>Have your say & add a comment!</h2>
      {success && <p className="success">Comment posted successfully!</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Username</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Comment</label>
          <textarea
            id="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit your comment"}
        </button>
      </form>
    </div>
  );
};

export default Adder;
