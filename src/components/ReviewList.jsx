import { useState, useEffect } from 'react';
import { fetchReviews, fetchCategories } from '../api';
import '../styles/reviewList.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categorySelected, setCategorySelected] = useState(false);
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const category = searchParams.get("category")

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(`/reviews?category=${selectedValue}`)
      
    } else {
      navigate(`/reviews`)
    }
    setSelectedCategory(selectedValue);
    setCategorySelected(selectedValue !== '');
  };

  useEffect(() => {
    Promise.all([fetchCategories(), fetchReviews(category)])
      .then((responseArr) => {
        setCategories(responseArr[0])
        setReviews(responseArr[1])
        setIsLoading(false)
    })
  }, [category]);


  return (
    <section className="review-list">
      <div className="heading">
        <h1>Here's our reviews!</h1>
      </div>
      <div className="category-filter">
        <label htmlFor="category">Filter by category:</label>
        <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.slug}
            </option>
          ))}
        </select>
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
                  <p>Review created at: {format(new Date(review.created_at), "HH:mm 'on' dd/MM/yyyy")}</p>
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
