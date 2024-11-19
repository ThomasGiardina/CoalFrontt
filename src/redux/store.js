import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from "./slices/favoritesSlice"
import contactReducer from './slices/contactSlice';

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        contact: contactReducer,
    },
});

export default store;
