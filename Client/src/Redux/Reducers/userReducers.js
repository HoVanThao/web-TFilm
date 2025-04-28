import * as userConstants from '../Constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USER_LOGIN_REQUEST:
            return { isLoading: true };
        case userConstants.USER_LOGIN_SUCCESS:
            return { isLoading: false, userInfo: action.payload, isSuccess: true };
        case userConstants.USER_LOGIN_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.USER_LOGIN_RESET:
            return {};
        case userConstants.USER_LOGOUT:
            return {};
        default:
            return state;

    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            return { isLoading: true };
        case userConstants.USER_REGISTER_SUCCESS:
            return { isLoading: false, userInfo: action.payload, isSuccess: true };
        case userConstants.USER_REGISTER_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.USER_REGISTER_RESET:
            return {};
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USER_UPDATE_PROFILE_REQUEST:
            return { isLoading: true };
        case userConstants.USER_UPDATE_PROFILE_SUCCESS:
            return { isLoading: false, userInfo: action.payload, isSuccess: true };
        case userConstants.USER_UPDATE_PROFILE_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
}

export const userDeleteProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USER_DELETE_PROFILE_REQUEST:
            return { isLoading: true };
        case userConstants.USER_DELETE_PROFILE_SUCCESS:
            return { isLoading: false, userInfo: action.payload, isSuccess: true };
        case userConstants.USER_DELETE_PROFILE_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.USER_DELETE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
}

export const userChangePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USER_CHANGE_PASSWORD_REQUEST:
            return { isLoading: true };
        case userConstants.USER_CHANGE_PASSWORD_SUCCESS:
            return { isLoading: false, isSuccess: true, message: action.payload.message };
        case userConstants.USER_CHANGE_PASSWORD_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.USER_CHANGE_PASSWORD_RESET:
            return {};
        default:
            return state;
    }
}

export const userGetFavoriteMoviesReducer = (state = { likedMovies: [] }, action) => {
    switch (action.type) {
        case userConstants.GET_FAVORITE_MOVIES_REQUEST:
            return { isLoading: true };
        case userConstants.GET_FAVORITE_MOVIES_SUCCESS:
            return { isLoading: false, likedMovies: action.payload };
        case userConstants.GET_FAVORITE_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.GET_FAVORITE_MOVIES_RESET:
            return {};
        default:
            return state;
    }
}

export const userDeleteAllFavoriteMoviesReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.DELETE_ALL_FAVORITE_MOVIES_REQUEST:
            return { isLoading: true };
        case userConstants.DELETE_ALL_FAVORITE_MOVIES_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case userConstants.DELETE_ALL_FAVORITE_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.DELETE_ALL_FAVORITE_MOVIES_RESET:
            return {};
        default:
            return state;
    }
}

export const userDeleteFavoriteMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.DELETE_FAVORITE_MOVIE_REQUEST:
            return { isLoading: true };
        case userConstants.DELETE_FAVORITE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case userConstants.DELETE_FAVORITE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.DELETE_FAVORITE_MOVIE_RESET:
            return {};
        default:
            return state;
    }
}

export const userLikeMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.LIKE_MOVIE_REQUEST:
            return { isLoading: true };
        case userConstants.LIKE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case userConstants.LIKE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.LIKE_MOVIE_RESET:
            return {};
        default:
            return state;
    }
}

export const adminGetAllUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case userConstants.GET_ALL_USERS_REQUEST:
            return { isLoading: true };
        case userConstants.GET_ALL_USERS_SUCCESS:
            return { isLoading: false, isSuccess: true, users: action.payload };
        case userConstants.GET_ALL_USERS_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.GET_ALL_USERS_RESET:
            return {
                users: [],
            };
        default:
            return state;
    }
}


export const adminDeleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.DELETE_USER_REQUEST:
            return { isLoading: true };
        case userConstants.DELETE_USER_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case userConstants.DELETE_USER_FAIL:
            return { isLoading: false, isError: action.payload };
        case userConstants.DELETE_USER_RESET:
            return {};
        default:
            return state;
    }
}