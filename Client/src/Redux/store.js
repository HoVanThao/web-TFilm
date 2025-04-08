import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit'

import * as User from './Reducers/userReducers'
import * as Categories from './Reducers/categoriesReducers'

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

});

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});