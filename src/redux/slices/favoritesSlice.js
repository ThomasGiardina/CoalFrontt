import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (token, { getState, rejectWithValue }) => {
        const usuarioId = getState().auth.userId;
        if (!usuarioId) {
            return rejectWithValue('UsuarioId no definido');
        }

        try {
            const response = await fetch(`http://localhost:4002/favoritos?usuarioId=${usuarioId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener favoritos.');
            }

            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addFavorite = createAsyncThunk(
    'favorites/addFavorite',
    async ({ usuarioId, videojuegoId, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:4002/favoritos/${videojuegoId}?usuarioId=${usuarioId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Error al agregar a favoritos.');
            }

            return videojuegoId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeFavorite = createAsyncThunk(
    'favorites/removeFavorite',
    async ({ usuarioId, videojuegoId, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:4002/favoritos/${videojuegoId}?usuarioId=${usuarioId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Error al eliminar de favoritos.');
            }

            return videojuegoId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const toggleFavorite = createAsyncThunk(
    'favorites/toggleFavorite',
    async ({ usuarioId, videojuegoId, token }, { dispatch, rejectWithValue }) => {
        if (!usuarioId || !token) {
            return rejectWithValue('Token o usuarioId no definidos.');
        }

        try {
            const response = await fetch(
                `http://localhost:4002/favoritos/${videojuegoId}?usuarioId=${usuarioId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error al alternar favoritos: ${response.statusText}`);
            }

            await dispatch(fetchFavorites(token));
            return videojuegoId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                if (!state.items.some((item) => item.id === action.payload)) {
                    state.items.push({ id: action.payload });
                }
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default favoritesSlice.reducer;
