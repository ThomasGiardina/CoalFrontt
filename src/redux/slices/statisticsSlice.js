import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBestSellers = createAsyncThunk('statistics/fetchBestSellers', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:4002/api/estadisticas/productos-mas-vendidos');
        if (!response.ok) throw new Error('Error al obtener productos más vendidos');
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        bestSellers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBestSellers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBestSellers.fulfilled, (state, action) => {
                state.loading = false;
                state.bestSellers = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchBestSellers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al cargar estadísticas';
            });
    },
});

export default statisticsSlice.reducer;
