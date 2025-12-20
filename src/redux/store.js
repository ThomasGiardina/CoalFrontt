import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import gamesReducer from './slices/gamesSlice';
import statisticsReducer from './slices/statisticsSlice';

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        auth: authReducer,
        cart: cartReducer,
        games: gamesReducer,
        statistics: statisticsReducer,
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
