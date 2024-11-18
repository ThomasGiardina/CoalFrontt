import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('favorites');
        return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
        console.warn("Error cargando localStorage", e);
        return [];
    }
};

const saveFavoritesToLocalStorage = (favorites) => {
    try {
        const serializedState = JSON.stringify(favorites);
        localStorage.setItem('favorites', serializedState);
    } catch (e) {
        console.warn("Error guardando localStorage", e);
    }
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: loadFavoritesFromLocalStorage(),
    reducers: {
        toggleFavorite: (state, action) => {
            const game = action.payload;
            const existingIndex = state.findIndex(item => item.id === game.id);
            let newState;
            if (existingIndex >= 0) {
                newState = state.filter(item => item.id !== game.id);
            } else {
                newState = [...state, game];
            }
            saveFavoritesToLocalStorage(newState);
            return newState;
        }
    }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
