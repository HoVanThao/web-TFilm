import * as moviesConstants from '../Constants/moviesConstants';
import * as moviesApi from '../APIs/moviesService';
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
