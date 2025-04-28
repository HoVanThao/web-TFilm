import * as MoviesConstants from '../Constants/moviesConstants';

export const moviesListReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case MoviesConstants.MOVIES_LIST_REQUEST:
            return { isLoading: true };
        case MoviesConstants.MOVIES_LIST_SUCCESS:
            return {
                isLoading: false,
                isSuccess: true,
                movies: action.payload.movies,
                page: action.payload.page,
                pages: action.payload.pages,
                totalMovies: action.payload.totalMovies,
            };
        case MoviesConstants.MOVIES_LIST_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
};

// get random movies
export const moviesRandomReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case MoviesConstants.MOVIES_RANDOM_REQUEST:
            return { isLoading: true };
        case MoviesConstants.MOVIES_RANDOM_SUCCESS:
            return { isLoading: false, movies: action.payload };
        case MoviesConstants.MOVIES_RANDOM_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
}

// GET MOVIE BY ID
export const movieDetailsReducer = (state = { movie: {} }, action) => {
    switch (action.type) {
        case MoviesConstants.MOVIE_DETAILS_REQUEST:
            return { isLoading: true };
        case MoviesConstants.MOVIE_DETAILS_SUCCESS:
            return { isLoading: false, movie: action.payload };
        case MoviesConstants.MOVIE_DETAILS_FAIL:
            return { isLoading: false, isError: action.payload };
        case MoviesConstants.MOVIE_DETAILS_RESET:
            return { movie: {} };
        default:
            return state;
    }
}

// GET TOP RATED MOVIES
export const movieTopRatedReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case MoviesConstants.MOVIE_TOP_RATED_REQUEST:
            return { isLoading: true };
        case MoviesConstants.MOVIE_TOP_RATED_SUCCESS:
            return { isLoading: false, movies: action.payload };
        case MoviesConstants.MOVIE_TOP_RATED_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
}

//CREATE REVIEW
export const createReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case MoviesConstants.CREATE_REVIEW_REQUEST:
            return { isLoading: true };
        case MoviesConstants.CREATE_REVIEW_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case MoviesConstants.CREATE_REVIEW_FAIL:
            return { isLoading: false, isError: action.payload };
        case MoviesConstants.CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
}