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

export const createGameAsync = createAsyncThunk(
    'games/createGame',
    async ({ formData, token }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:4002/videojuegos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Error al crear el juego');
            }

            const responseText = await response.text();
            return responseText ? JSON.parse(responseText) : {};
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateGameAsync = createAsyncThunk(
    'games/updateGame',
    async ({ id, formData, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4002/videojuegos/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Error al actualizar el juego');
            }

            const responseText = await response.text();
            return responseText ? JSON.parse(responseText) : {};
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteGameAsync = createAsyncThunk(
    'games/deleteGame',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4002/videojuegos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el juego');
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
            })
            .addCase(createGameAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGameAsync.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload && action.payload.id) {
                    state.items.unshift(action.payload);
                }
            })
            .addCase(createGameAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al crear el juego';
            })
            .addCase(updateGameAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGameAsync.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload && action.payload.id) {
                    const index = state.items.findIndex(g => g.id === action.payload.id);
                    if (index >= 0) state.items[index] = action.payload;
                }
            })
            .addCase(updateGameAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al actualizar el juego';
            })
            .addCase(deleteGameAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGameAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(g => g.id !== action.payload);
            })
            .addCase(deleteGameAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al eliminar el juego';
            });
    },
});

export const { addGame, updateGame, removeGame, clearCurrentGame } = gamesSlice.actions;

export default gamesSlice.reducer;