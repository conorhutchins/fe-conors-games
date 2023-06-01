import axios from "axios";

const ConsApi = axios.create({
    baseURL: "https://conors-game.onrender.com/api",
})

export const fetchReviews = () => {
    return ConsApi
        .get(`/reviews`)
        .then(({ data }) => {
            return data;
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