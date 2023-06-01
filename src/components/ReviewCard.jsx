import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewById } from "../api";
import "../styles/reviewCard.css";
import CommentList from "./CommentList";

const ReviewCard = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (reviewId) {
      fetchReviewById(reviewId)
        .then((reviewFromApi) => {
          setReview(reviewFromApi);
          setIsLoading(false);
        })
    }
  }, [reviewId]);

  return (
    <article>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <main className="review-card">
          <h1>{review.title}</h1>
          <h2>Designer: {review.designer}</h2>
          <h3>Owner: {review.owner}</h3>
          <figure>
            <img src={review.review_img_url} alt={`An image of ${review.title}`} />
          </figure>
          <p>{review.review_body}</p>
          <p>Category: {review.category}</p>
          <p>Created at: {review.created_at}</p>
          <p>Votes: {review.votes}</p>
          <CommentList reviewId={reviewId} />
        </main>
      )}
    </article>
  );
};

export default ReviewCard;
