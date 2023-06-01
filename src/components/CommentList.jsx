import { useEffect, useState } from "react";
import { fetchCommentsForReviewId } from "../api";
import CommentCard from "./CommentCard";

const CommentList = ({ reviewId, addComment }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (reviewId) {
      fetchCommentsForReviewId(reviewId)
        .then((commentsData) => {
          if (commentsData instanceof Array) {
            setComments(commentsData);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [reviewId]);

  return (
    <section>
      <h2>Comments:</h2>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          {comments.length === 0 ? (
            <p>No comments available yet</p>
          ) : (
            <>
              <CommentCard key={comments[0].comment_id} comment={comments[0]} />
              {comments.slice(1).map((comment) => (
                <CommentCard key={comment.comment_id} comment={comment} />
              ))}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default CommentList;
