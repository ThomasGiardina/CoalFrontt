import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: null,
    role: null,
    tokenExpiry: null,
    userCards: [],
    profileImage: null,
};

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (refreshTokenValue, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:4002/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: refreshTokenValue }),
            });

            if (!response.ok) {
                throw new Error('Error al renovar el token');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserCards = createAsyncThunk(
    'auth/fetchUserCards',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        if (!token) {
            return rejectWithValue('Token no disponible');
        }

        try {
            const response = await fetch('http://localhost:4002/metodosPago/usuario', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Error al obtener las tarjetas');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
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
            state.userId = action.payload.userId;
            state.profileImage = action.payload.profileImage || null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
            state.tokenExpiry = null;
            state.userId = null;
            state.userCards = [];
            state.profileImage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCards.fulfilled, (state, action) => {
                state.userCards = action.payload;
            })
            .addCase(fetchUserCards.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
