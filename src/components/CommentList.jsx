import { useEffect, useState } from "react";
import { fetchCommentsForReviewId, postCommentForAReviewId } from "../api";
import CommentCard from "./CommentCard";
import Adder from "./Adder";
import "../styles/adder.css";

const CommentList = ({ reviewId }) => {
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

  const handleCommentAdd = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleSubmitComment = (commentData) => {
    postCommentForAReviewId(reviewId, commentData)
      .then((comment) => {
        handleAddComment(comment);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

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
                <Adder reviewId= {reviewId} onCommentAdd={handleCommentAdd} />
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
