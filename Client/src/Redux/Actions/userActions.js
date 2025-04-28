import * as userConstants from '../Constants/userConstants';
import * as userApi from '../APIs/userServices';
import toast from 'react-hot-toast';
import { ErrorsAction, tokenProtection } from '../protection';

const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST });
        const response = await userApi.loginService(datas);
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
    }
};

const registerAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        const response = await userApi.registerService(datas);
        dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
    }
};

const logoutAction = () => (dispatch) => {
    userApi.logoutService();
    dispatch({ type: userConstants.USER_LOGOUT });
    dispatch({ type: userConstants.USER_LOGIN_RESET });
    dispatch({ type: userConstants.USER_REGISTER_RESET });
};

const updateProfileAction = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
        const response = await userApi.updateProfileService(datas, tokenProtection(getState));
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_SUCCESS, payload: response });
        toast.success("Cập nhật thành công");
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });

    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    }
};

const deleteProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
        const response = await userApi.deleteProfileService(tokenProtection(getState));
        dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS, payload: response });
        toast.success("Xóa tài khoản thành công");
        dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET });
        dispatch(logoutAction());

    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    }
};


const changePasswordAction = (password) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
        const response = await userApi.changePasswordService(password, tokenProtection(getState));
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, payload: response });

    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
};

const getFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
        const response = await userApi.getFavoriteMovies(tokenProtection(getState));
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
    }
};

const deleteAllFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_ALL_FAVORITE_MOVIES_REQUEST });
        await userApi.deleteFavoriteMovies(tokenProtection(getState));
        dispatch({ type: userConstants.DELETE_ALL_FAVORITE_MOVIES_SUCCESS });
        toast.success("Phim yêu thích đã bị xóa!")
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.DELETE_ALL_FAVORITE_MOVIES_FAIL);
    }
};

const deleteFavoriteMovieByIdAction = (movieId) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIE_REQUEST });
        await userApi.deleteFavoriteMovieById(movieId, tokenProtection(getState));
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIE_SUCCESS });
        toast.success("Xóa thành công!");
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_MOVIE_FAIL);
    }
};

const getAllUsersAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
        const response = await userApi.getAllUsersService(tokenProtection(getState));
        dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response, });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
    }
};

const deleteUsersAction = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_USER_REQUEST });
        await userApi.deleteUserService(userId, tokenProtection(getState));
        dispatch({ type: userConstants.DELETE_USER_SUCCESS });
        toast.success("Xóa thành công!");
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.DELETE_USER_RESET);
    }
};

const likeMovieAction = (movieId) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
        const response = await userApi.likeMovieService(
            movieId,
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.LIKE_MOVIE_SUCCESS,
            payload: response,
        });
        toast.success("Đã thêm vào danh sách yêu thích");
        dispatch(getFavoriteMoviesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
    }
}




export {
    loginAction,
    registerAction,
    logoutAction,
    updateProfileAction,
    deleteProfileAction,
    changePasswordAction,
    getFavoriteMoviesAction,
    deleteAllFavoriteMoviesAction,
    getAllUsersAction,
    deleteUsersAction,
    deleteFavoriteMovieByIdAction,
    likeMovieAction,
}