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
)}