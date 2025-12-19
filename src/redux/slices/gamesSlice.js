import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGames = createAsyncThunk('games/fetchGames', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:4002/videojuegos');
        if (!response.ok) throw new Error('Error al obtener juegos');
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchGameById = createAsyncThunk('games/fetchGameById', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:4002/videojuegos/${id}`);
        if (!response.ok) throw new Error('Error al obtener el juego');
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        items: [],
        currentGame: null,
        loading: false,
        error: null,
    },
    reducers: {
        addGame: (state, action) => {
            state.items.unshift(action.payload);
        },
        updateGame: (state, action) => {
            const index = state.items.findIndex(g => g.id === action.payload.id);
            if (index >= 0) state.items[index] = action.payload;
        },
        removeGame: (state, action) => {
            state.items = state.items.filter(g => g.id !== action.payload);
        },
        clearCurrentGame: (state) => {
            state.currentGame = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.loading = false;
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al cargar juegos';
            })
            .addCase(fetchGameById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentGame = action.payload;
            })
            .addCase(fetchGameById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al cargar el juego';
            });
    },
});

export const { addGame, updateGame, removeGame, clearCurrentGame } = gamesSlice.actions;

export default gamesSlice.reducer;