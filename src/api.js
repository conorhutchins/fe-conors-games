import axios from "axios";

const ConsApi = axios.create({
    baseURL: "https://conors-game.onrender.com/api",
})

export const fetchReviews = (category) => {
    let query = ""
    if (!category) {
        query = "/reviews"
    } else {
        query = `/reviews?category=${category}`

    }
    return ConsApi
        .get(query)
        .then(({ data }) => {
        return data.reviews;
            
        })
}

export const fetchReviewById = (reviewId) => {
    return ConsApi
        .get(`/reviews/${reviewId}`)
        .then(({ data }) => {
            return data.review;
        })
}

export const fetchCommentsForReviewId = (reviewId) => {
    return ConsApi
        .get(`/reviews/${reviewId}/comments`)
        .then(({ data }) => {
            return data.comments;
        })
}

export const voteOnReview = (reviewId, increment) => {
    return ConsApi
        .patch(`/review/${reviewId}`, { inc_votes: increment ? 1 : -1 })
        .then((response) => {
            return response.data.review;
        })
}

export const postCommentForAReviewId = (reviewId, commentData) => {
    return ConsApi
        .post(`/reviews/${reviewId}/comments`, commentData)
        .then((response) => {
            return response.data.comment;
        })
}

export const fetchCategories = () => {
    return ConsApi.get(`/categories`)
        .then((response) => {
      return response.data;
    });
  };
export const fetchReviewsByCategory = (category) => {
    return ConsApi
        .get(`/reviews?category=${category}`)
        .then(({ data }) => {
            return data.reviews;
        });
};
