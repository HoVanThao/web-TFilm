import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit'

import * as User from './Reducers/userReducers'
import * as Categories from './Reducers/categoriesReducers'
import * as Movies from './Reducers/moviesReducers'

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
    userLikeMovie: User.userLikeMovieReducer,

    // add reducers category
    categoryGetAll: Categories.getAllCategoriesReducer,
    categoryCreate: Categories.createCategoryReducer,
    categoryUpdate: Categories.updateCategoryReducer,
    categoryDelete: Categories.deleteCategoryReducer,

    // movies
    getAllMovies: Movies.moviesListReducer,
    getRandomMovies: Movies.moviesRandomReducer,
    getMovieById: Movies.movieDetailsReducer,
    getTopRatedMovie: Movies.movieTopRatedReducer,
    createReview: Movies.createReviewReducer,
    deleteMovie: Movies.deleteMovieReducer,
    deleteAllMovies: Movies.deleteAllMovieReducer,
    createMovie: Movies.createMovieReducer,
    casts: Movies.castsReducer,

    // mới
    getCinemaMovies: Movies.moviesCinemaReducer,
    getSingleMovies: Movies.moviesSingleReducer,
    getSeriesMovies: Movies.moviesSeriesReducer,
    getAnimeMovies: Movies.moviesAnimeReducer,
    homePageData: Movies.homePageDataReducer,

});

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});