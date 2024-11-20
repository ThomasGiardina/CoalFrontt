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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: refreshTokenValue }),
            });

            if (!response.ok) {
                throw new Error('Error al renovar el token');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserCards = createAsyncThunk(
    'auth/fetchUserCards',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token; 
        try {
            const response = await fetch('http://localhost:4002/metodosPago/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Error al obtener las tarjetas');
            return await response.json(); 
        } catch (error) {
            return rejectWithValue(error.message); 
        }
    }
);

export const fetchProfileImage = createAsyncThunk(
    'auth/fetchProfileImage',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        try {
            const response = await fetch(`http://localhost:4002/api/usuario/imagen/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Error al obtener la imagen de perfil');
            const blob = await response.blob();
            return URL.createObjectURL(blob);
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
            state.refreshToken = action.payload.refreshToken;
            state.role = action.payload.role;
            state.userId = action.payload.userId;
            state.tokenExpiry = action.payload.tokenExpiry || null;
            state.profileImage = action.payload.profileImage || null; 
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
            state.userId = null;
            state.role = null;
            state.tokenExpiry = null;
            state.userCards = [];
            state.profileImage = null; 
        },
        updateProfileImage: (state, action) => {
            state.profileImage = action.payload; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCards.fulfilled, (state, action) => {
                state.userCards = action.payload;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(fetchUserCards.rejected, (state, action) => {
                console.error('Error al obtener tarjetas:', action.payload);
                state.isAuthenticated = false; 
            })
            .addCase(fetchProfileImage.fulfilled, (state, action) => {
                state.profileImage = action.payload; 
            });
    },
});

export const { login, logout, updateProfileImage } = authSlice.actions;
export default authSlice.reducer;
