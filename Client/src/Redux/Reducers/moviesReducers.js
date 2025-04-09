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