import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('favorites');
        return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
        console.warn("Error loading favorites from localStorage", e);
        return [];
    }
};

const saveFavoritesToLocalStorage = (favorites) => {
    try {
        const serializedState = JSON.stringify(favorites);
        localStorage.setItem('favorites', serializedState);
    } catch (e) {
        console.warn("Error saving favorites to localStorage", e);
    }
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: loadFavoritesFromLocalStorage(),
    reducers: {
        toggleFavorite: (state, action) => {
            const game = action.payload;
            const existingIndex = state.findIndex(item => item.id === game.id);
            if (existingIndex >= 0) {
                state.splice(existingIndex, 1);
            } else {
                state.push(game);
            }
            saveFavoritesToLocalStorage(state);
        }
    }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;