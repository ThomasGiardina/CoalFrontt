import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';

const store = configureStore({
    reducer: {
        contact: contactReducer,
    },
});

export default store;