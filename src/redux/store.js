import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import gamesReducer from './slices/gamesSlice';

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        auth: authReducer,
        cart: cartReducer,
        games: gamesReducer,
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
