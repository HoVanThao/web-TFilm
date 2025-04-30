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

// delete movie
export const deleteMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case MoviesConstants.DELETE_MOVIE_REQUEST:
            return { isLoading: true };
        case MoviesConstants.DELETE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case MoviesConstants.DELETE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload };
        case MoviesConstants.DELETE_MOVIE_RESET:
            return {};
        default:
            return state;
    }
}


// delete all movies
export const deleteAllMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case MoviesConstants.DELETE_ALL_MOVIES_REQUEST:
            return { isLoading: true };
        case MoviesConstants.DELETE_ALL_MOVIES_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case MoviesConstants.DELETE_ALL_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        case MoviesConstants.DELETE_ALL_MOVIES_RESET:
            return {};
        default:
            return state;
    }
}

// create movie
export const createMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case MoviesConstants.CREATE_MOVIE_REQUEST:
            return { isLoading: true };
        case MoviesConstants.CREATE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case MoviesConstants.CREATE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload };
        case MoviesConstants.CREATE_MOVIE_RESET:
            return {};
        default:
            return state;
    }
}

export const castsReducer = (state = { casts: [] }, action) => {
    switch (action.type) {
        case MoviesConstants.ADD_CAST:
            return { casts: [...state.casts, action.payload] };
        case MoviesConstants.EDIT_CAST:
            const updatedCasts = state.casts.map((cast) => {
                cast.id === action.payload.id ? action.payload : cast
            });
            return {
                casts: updatedCasts,
            }
        case MoviesConstants.DELETE_CAST:
            return {
                ...state,
                casts: state.casts.filter((cast) => cast.id !== action.payload)
            }
        case MoviesConstants.RESET_CAST:
            return { casts: [] }
        default:
            return state;
    }
}

// homeScreen
// Reducer cho phim chiếu rạp
export const moviesCinemaReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case MoviesConstants.MOVIES_CINEMA_REQUEST:
            return { isLoading: true };
        case MoviesConstants.MOVIES_CINEMA_SUCCESS:
            return {
                isLoading: false,
                isSuccess: true,
                movies: action.payload.movies,
                page: action.payload.page,
                pages: action.payload.pages,
                totalMovies: action.payload.totalMovies,
            };
        case MoviesConstants.MOVIES_CINEMA_FAIL:
            return { isLoading: false, isError: action.payload };
        case MoviesConstants.MOVIES_CINEMA_RESET:
            return { movies: [] };
        default:
            return state;
    }
};

// Reducer cho phim lẻ
export const moviesSingleReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case MoviesConstants.MOVIES_SINGLE_REQUEST:
            return { isLoading: true };
        case MoviesConstants.MOVIES_SINGLE_SUCCESS:
            return {
                isLoading: false,
                isSuccess: true,
                movies: action.payload.movies,
                page: action.payload.page,
                pages: action.payload.pages,
                totalMovies: action.payload.totalMovies,
            };
        case MoviesConstants.MOVIES_SINGLE_FAIL:
            return { isLoading: false, isError: action.payload };
        case MoviesConstants.MOVIES_SINGLE_RESET:
            return { movies: [] };
        default:
            return state;
    }
};

// Reducer cho phim bộ
export const moviesSeriesReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case MoviesConstants.MOVIES_SERIES_REQUEST:
            return { isLoading: true };
        case MoviesConstants.MOVIES_SERIES_SUCCESS:
            return {
                isLoading: false,
                isSuccess: true,
                movies: action.payload.movies,
                page: action.payload.page,
                pages: action.payload.pages,
                totalMovies: action.payload.totalMovies,
            };
        case MoviesConstants.MOVIES_SERIES_FAIL:
            return { isLoading: false, isError: action.payload };
        case MoviesConstants.MOVIES_SERIES_RESET:
            return { movies: [] };
        default:
            return state;
    }
};

// Reducer cho anime
export const moviesAnimeReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case MoviesConstants.MOVIES_ANIME_REQUEST:
            return { isLoading: true };
        case MoviesConstants.MOVIES_ANIME_SUCCESS:
            return {
                isLoading: false,
                isSuccess: true,
                movies: action.payload.movies,
                page: action.payload.page,
                pages: action.payload.pages,
                totalMovies: action.payload.totalMovies,
            };
        case MoviesConstants.MOVIES_ANIME_FAIL:
            return { isLoading: false, isError: action.payload };
        case MoviesConstants.MOVIES_ANIME_RESET:
            return { movies: [] };
        default:
            return state;
    }
};

////////////////
// Thêm reducer mới
export const homePageDataReducer = (state = {
    randomMovies: [],
    topRatedMovies: [],
    allMovies: [],
    cinemaMovies: [],
    singleMovies: [],
    seriesMovies: [],
    animeMovies: []
}, action) => {
    switch (action.type) {
        case MoviesConstants.HOME_PAGE_DATA_REQUEST:
            return { ...state, isLoading: true };
        case MoviesConstants.HOME_PAGE_DATA_SUCCESS:
            return {
                isLoading: false,
                isSuccess: true,
                randomMovies: action.payload.randomMovies,
                topRatedMovies: action.payload.topRatedMovies,
                allMovies: action.payload.allMovies,
                cinemaMovies: action.payload.cinemaMovies,
                singleMovies: action.payload.singleMovies,
                seriesMovies: action.payload.seriesMovies,
                animeMovies: action.payload.animeMovies
            };
        case MoviesConstants.HOME_PAGE_DATA_FAIL:
            return { ...state, isLoading: false, isError: action.payload };
        default:
            return state;
    }
};



