import {
    combineReducers,
    configureStore,
    applyMiddleware,
} from '@reduxjs/toolkit'

import * as User from './Reducers/userReducers'
import * as Categories from './Reducers/categoriesReducers'
import * as Movies from './Reducers/moviesReducers'
// import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    // add reducers users
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userUpdateProfile: User.userUpdateProfileReducer,
    userDeleteProfile: User.userDeleteProfileReducer,
    userChangePassword: User.userChangePasswordReducer,
    userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
    userDeleteAllFavoriteMovies: User.userDeleteAllFavoriteMoviesReducer,
    userDeleteFavoriteMovie: User.userDeleteFavoriteMovieReducer,
    adminGetAllUsers: User.adminGetAllUsersReducer,
    adminDeleteUser: User.adminDeleteUserReducer,

    // add reducers category
    categoryGetAll: Categories.getAllCategoriesReducer,
    categoryCreate: Categories.createCategoryReducer,
    categoryUpdate: Categories.updateCategoryReducer,
    categoryDelete: Categories.deleteCategoryReducer,

    // movies
    getAllMovies: Movies.moviesListReducer,

});

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //       serializableCheck: false, // Tắt kiểm tra serializable để tránh lỗi với async actions
    //     }).concat(thunk), // Thêm redux-thunk
});