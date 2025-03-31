import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit'

import * as User from './Reducers/userReducers'

const rootReducer = combineReducers({
    // add reducers here
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
    // userRegister: { userInfo: userInfoFromLocalStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});