import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: null,
    role: null,
    tokenExpiry: null,
    userCards: [], // Tarjetas del usuario
};

export const fetchUserCards = createAsyncThunk(
    'auth/fetchUserCards',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token; // Obtén el token desde el estado
        try {
            const response = await fetch('http://localhost:4002/metodosPago/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Error al obtener las tarjetas');
            return await response.json(); // Devuelve las tarjetas
        } catch (error) {
            return rejectWithValue(error.message); // Maneja errores
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.tokenExpiry = action.payload.tokenExpiry || null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
            state.tokenExpiry = null;
            state.userCards = []; // Limpia las tarjetas en logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCards.fulfilled, (state, action) => {
                state.userCards = action.payload; // Guarda las tarjetas en el estado
            })
            .addCase(fetchUserCards.rejected, (state, action) => {
                console.error('Error al obtener tarjetas:', action.payload);
            });
    },
});

// Acciones
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
