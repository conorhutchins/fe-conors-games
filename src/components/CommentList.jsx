import { useEffect, useState } from "react";
import { fetchCommentsForReviewId } from "../api";
import CommentCard from "./CommentCard";


const CommentList = ({ reviewId }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (reviewId) {
        fetchCommentsForReviewId(reviewId)
          .then((commentsData) => {
            if (commentsData instanceof Array) {
              setComments(commentsData)
            }
            setIsLoading(false)
          })

          .catch((error) => {
              console.error('Error fetching comments:', error);
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
          comments.map((comment) => (
            <CommentCard key={comment.commentId} comment={comment} />
          ))
        )}
      </>
    )}
  </section>
);
};

 
export default CommentList;