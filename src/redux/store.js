import usersReducer from "./userSlice";
import loaderReducer from "./LoaderSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        users: usersReducer,
        loaders: loaderReducer,
    },
});

export default store;