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

export const fetchCommentsForReviewId = (reviewId) => {
    return ConsApi
        .get(`/reviews/${reviewId}/comments`)
        .then(({ data }) => {
            return data.comments;
        }).catch(err => {
                return (err)
            }
        )
}