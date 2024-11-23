import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import contactReducer from './slices/contactSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        contact: contactReducer,
        auth: authReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    getToken: () => store.getState().auth.token,
                },
            },
            serializableCheck: false, 
        }),
});

export default store;
