import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favoritesReducer from './slices/favoritesSlice';
import contactReducer from './slices/contactSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

// Configuración para persistir autenticación
const authPersistConfig = {
    key: 'auth',
    storage,
};

// Configuración para persistir carrito
const cartPersistConfig = {
    key: 'cart',
    storage,
};

// Reducers persistidos
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Configuración del store
const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        contact: contactReducer,
        auth: persistedAuthReducer,
        cart: persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    getToken: () => store.getState().auth.token,
                },
            },
            serializableCheck: false, // Necesario para redux-persist
        }),
});

// Persistor para redux-persist
export const persistor = persistStore(store);
export default store;
