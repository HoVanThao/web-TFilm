import * as moviesConstants from '../Constants/moviesConstants';
import * as moviesApi from '../APIs/moviesService';
import { getRecommendedMoviesService, updateAllFeaturesService } from '../APIs/RecommendationService';
import toast from 'react-hot-toast';
import { ErrorsAction, tokenProtection } from '../protection';


export const getAllMoviesAction = ({
    category = "",
    language = "",
    rate = "",
    year = "",
    typeFilm = "",
    search = "",
    pageNumber = "",

}) => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_LIST_REQUEST });
        const response = await moviesApi.getAllMoviesService(
            category, language, rate, year, typeFilm, search, pageNumber
        );
        dispatch({ type: moviesConstants.MOVIES_LIST_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL);
    }
}

// get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_RANDOM_REQUEST });
        const response = await moviesApi.getRandomMoviesService();
        dispatch({
            type: moviesConstants.MOVIES_RANDOM_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL);
    }
}

// get movie by id action
export const getMovieByIdAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIE_DETAILS_REQUEST });
        const response = await moviesApi.getMovieByIdService(id);
        dispatch({
            type: moviesConstants.MOVIE_DETAILS_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIE_DETAILS_FAIL);
    }
}

// get top rated movie action
export const getTopRatedMovieAction = () => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIE_TOP_RATED_REQUEST });
        const response = await moviesApi.getTopRatedMoviesService();
        dispatch({
            type: moviesConstants.MOVIE_TOP_RATED_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIE_TOP_RATED_FAIL);
    }
}

export const reviewMovieAction = ({ id, review }) => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.CREATE_REVIEW_REQUEST });
        const response = await moviesApi.reviewMovieService(
            id,
            review,
            tokenProtection(getState),
        );
        dispatch({
            type: moviesConstants.CREATE_REVIEW_SUCCESS,
            payload: response,
        });
        toast.success("Bình luận thành công");
        dispatch({
            type: moviesConstants.CREATE_REVIEW_RESET,
        });
        dispatch(getMovieByIdAction(id));
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL);
    }
}

// delete movie action
export const deleteMovieByIdAction = (movieId) => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.DELETE_MOVIE_REQUEST });
        const response = await moviesApi.deleteMovieByIdService(movieId, tokenProtection(getState));
        dispatch({ type: moviesConstants.DELETE_MOVIE_SUCCESS, payload: response, });
        toast.success("Xóa thành công!");
        dispatch(getAllMoviesAction({}));
        dispatch(getSingleMoviesAction({}));
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.DELETE_MOVIE_FAIL);
    }
};

// delete all movies action
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_REQUEST });
        const response = await moviesApi.deleteMoviesService(tokenProtection(getState));
        dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_SUCCESS, payload: response, });
        toast.success("Tất cả phim đã bị xóa!")
        dispatch(getAllMoviesAction({}));
        dispatch(getSingleMoviesAction({}));
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.DELETE_ALL_MOVIES_FAIL);
    }
};

export const createMovieAction = (movie) => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.CREATE_MOVIE_REQUEST });
        const response = await moviesApi.createMovieService(
            movie,
            tokenProtection(getState),
        )

        dispatch({
            type: moviesConstants.CREATE_MOVIE_SUCCESS,
            payload: response,
        })

        toast.success("Thêm mới thành công");
        dispatch(deleteAllCastAction());
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.CREATE_MOVIE_FAIL);
    }
}


export const createSeriesAction = (series) => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.CREATE_SERIES_REQUEST });
        const response = await moviesApi.createSeriesService(
            series,
            tokenProtection(getState),
        )

        dispatch({
            type: moviesConstants.CREATE_SERIES_SUCCESS,
            payload: response,
        })

        toast.success("Thêm phim bộ thành công");
        dispatch(deleteAllCastAction());
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.CREATE_SERIES_FAIL);
    }
}

export const updateSeriesAction = (movieId, series) => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.UPDATE_SERIES_REQUEST });
        const response = await moviesApi.updateSeriesService(
            movieId,
            series,
            tokenProtection(getState)
        );

        dispatch({
            type: moviesConstants.UPDATE_SERIES_SUCCESS,
            payload: response,
        });

        toast.success("Cập nhật thành công");
        dispatch(getMovieByIdAction(movieId));
        dispatch(deleteAllCastAction());
    } catch (error) {
        console.log(error);
        ErrorsAction(error, dispatch, moviesConstants.UPDATE_SERIES_FAIL);
    }
};

export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.UPDATE_MOVIE_REQUEST });
        const response = await moviesApi.updateMovieService(
            tokenProtection(getState),
            id,
            movie,
        )

        dispatch({
            type: moviesConstants.UPDATE_MOVIE_SUCCESS,
            payload: response,
        })

        toast.success("Update thành công");
        dispatch(getMovieByIdAction(id));
        dispatch(deleteAllCastAction());
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.UPDATE_MOVIE_FAIL);
    }
}

// add cast
export const addCastAction = (cast) => async (dispatch, getState) => {
    dispatch({ type: moviesConstants.ADD_CAST, payload: cast });
    localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
}

// remove cast
export const removeCastAction = (id) => async (dispatch, getState) => {
    dispatch({ type: moviesConstants.DELETE_CAST, payload: id });
    localStorage.setItem("casts", JSON.stringify(getState().casts.casts));

}

// update cast
export const updateCastAction = (cast) => async (dispatch, getState) => {
    dispatch({ type: moviesConstants.EDIT_CAST, payload: cast });
    localStorage.setItem("casts", JSON.stringify(getState().casts.casts));

}

// delete all cast
export const deleteAllCastAction = () => async (dispatch) => {
    dispatch({ type: moviesConstants.RESET_CAST });
    localStorage.removeItem("casts");
}

// new
// Get cinema movies action
export const getCinemaMoviesAction = () => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_CINEMA_REQUEST });
        const response = await moviesApi.getAllMoviesService(
            "Chiếu Rạp", // category
            "", // language
            "", // rate
            "", // year
            "", // typeFilm
            "", // search
            ""  // pageNumber
        );
        dispatch({ type: moviesConstants.MOVIES_CINEMA_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_CINEMA_FAIL);
    }
};

// Get single movies action
export const getSingleMoviesAction = ({
    category = "",
    language = "",
    rate = "",
    year = "",
    typeFilm = "single",
    search = "",
    pageNumber = "",
}) => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_SINGLE_REQUEST });
        const response = await moviesApi.getAllMoviesService(
            category, language, rate, year, typeFilm, search, pageNumber
        );
        dispatch({ type: moviesConstants.MOVIES_SINGLE_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_SINGLE_FAIL);
    }
};


// Get series movies action
export const getSeriesMoviesAction = (
    {
        category = "",
        language = "",
        rate = "",
        year = "",
        typeFilm = "series",
        search = "",
        pageNumber = "",
    }
) => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_SERIES_REQUEST });
        const response = await moviesApi.getAllMoviesService(
            category, language, rate, year, typeFilm, search, pageNumber
        );
        dispatch({ type: moviesConstants.MOVIES_SERIES_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_SERIES_FAIL);
    }
};

// Get anime movies action
export const getAnimeMoviesAction = () => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_ANIME_REQUEST });
        const response = await moviesApi.getAllMoviesService(
            "Anime", // category
            "", // language
            "", // rate
            "", // year
            "", // typeFilm
            "", // search
            ""  // pageNumber
        );
        dispatch({ type: moviesConstants.MOVIES_ANIME_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_ANIME_FAIL);
    }
};

export const getHomePageDataAction = () => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.HOME_PAGE_DATA_REQUEST });
        const response = await moviesApi.getHomePageDataService();
        dispatch({
            type: moviesConstants.HOME_PAGE_DATA_SUCCESS,
            payload: {
                randomMovies: response.randomMovies,
                topRatedMovies: response.topRatedMovies,
                allMovies: response.allMovies,
                cinemaMovies: response.cinemaMovies,
                singleMovies: response.singleMovies,
                seriesMovies: response.seriesMovies,
                animeMovies: response.animeMovies
            }
        });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.HOME_PAGE_DATA_FAIL);
    }
};


// Get recommendations action
// action lấy recommended movies
export const getRecommendedMoviesAction = (currentMovieId) => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_RECOMMENDED_REQUEST });
        const response = await getRecommendedMoviesService(tokenProtection(getState), currentMovieId);
        dispatch({
            type: moviesConstants.MOVIES_RECOMMENDED_SUCCESS,
            payload: response
        });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_RECOMMENDED_FAIL);
    }
};

// Admin update features action
export const adminUpdateFeaturesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.ADMIN_UPDATE_FEATURES_REQUEST });

        const response = await updateAllFeaturesService(tokenProtection(getState));

        dispatch({
            type: moviesConstants.ADMIN_UPDATE_FEATURES_SUCCESS,
            payload: response
        });

        toast.success("Cập nhật features thành công");
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.ADMIN_UPDATE_FEATURES_FAIL);
    }
};