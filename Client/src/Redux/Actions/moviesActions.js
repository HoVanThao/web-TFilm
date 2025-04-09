import * as moviesConstants from '../Constants/moviesConstants';
import * as moviesApi from '../APIs/moviesService';
import toast from 'react-hot-toast';
import { ErrorsAction, tokenProtection } from '../protection';


export const getAllMoviesAction = async ({
    category = "",
    time = "",
    rate = "",
    year = "",
    search = "",
    language = "",
    pageNumber = "",

}) => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_LIST_REQUEST });
        const response = await moviesApi.getAllMoviesService(
            category, time, rate, year, search, language, pageNumber,
        );
        dispatch({ type: moviesConstants.MOVIES_LIST_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL);
    }
}