import axios from "axios";

const ConsApi = axios.create({
    baseURL: "https://conors-game.onrender.com/api",
})

export const fetchReviews = () => {
    return ConsApi
        .get(`/reviews`)
        .then(({ data }) => {
            return data;
        }).catch(err => {
            return (err)
        }
    )
}

export const fetchReviewById = (reviewId) => {
    return ConsApi
        .get(`/reviews/${reviewId}`)
        .then(({ data }) => {
            return data.review;
        }).catch(err => {
            return (err)
        }
    )
}

export const voteOnReview = (reviewId, increment) => {
    return ConsApi
        .patch(`/review/${reviewId}`, { inc_votes: increment ? 1 : -1 })
        .then((response) => {
            return response.data.review;
        })
}