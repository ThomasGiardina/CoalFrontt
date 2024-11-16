import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        toggleFavorite: (state, action) => {
            const game = action.payload;
            const existingIndex = state.findIndex(item => item.id === game.id);
            if (existingIndex >= 0) {
                state.splice(existingIndex, 1);
            } else {
                state.push(game);
            }
        }
    }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;