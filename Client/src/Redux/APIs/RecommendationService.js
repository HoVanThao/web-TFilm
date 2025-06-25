// Client/src/Redux/APIs/recommendationService.js
import Axios from "./Axios"

// *********************** PUBLIC APIs *********************

// get recommended movies for user
export const getRecommendedMoviesService = async (token, currentMovieId) => {
    const { data } = await Axios.get(`/recommendations/${currentMovieId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};



// *********************** ADMIN APIs *********************

// update features for all movies (admin only)
export const updateAllFeaturesService = async (token) => {
    const { data } = await Axios.post(`/recommendations/update-features`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};