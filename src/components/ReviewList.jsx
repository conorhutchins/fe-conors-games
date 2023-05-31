import { useState, useEffect } from 'react';
import { fetchReviews } from '../api';
import '../styles/reviewList.css';
import { Link } from 'react-router-dom';

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
      <div className="heading">
        <h1>Here's all our reviews!</h1>
      </div>
      <div className="cards">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {reviews.map((review) => (
              <div className="review-card" key={review.review_id}>
                <Link to={`/reviews/${review.review_id}`}>
                  <h2>{review.title} as designed by {review.designer}</h2>
                </Link>
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
      </div>
    </section>
  );
};

export default ReviewList;
