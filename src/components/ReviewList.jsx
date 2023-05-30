import { useState, useEffect } from 'react';
import { fetchReviews } from '../api';
import '../styles/ReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews()
      .then(({ reviews }) => {
        setReviews(reviews);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  return (
    <section className="review-list">
      <h1>Here's all our reviews!</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {reviews.map((review) => (
            <div className="review-card" key={review.review_id}>
              <h2>{review.title} as designed by {review.designer}</h2>
              <h3>Current Owner: {review.owner}</h3>
              <img src={review.review_img_url} alt={`An image of ${review.title}`} />
              <h3>Category: {review.category}</h3>
              <p>created at: {review.created_at}</p>
              <p>votes: {review.votes}</p>
              <p>comments: {review.comment_count}</p>
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default ReviewList;
