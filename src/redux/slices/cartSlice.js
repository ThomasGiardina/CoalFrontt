import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    carritoId: null, 
    cartItems: [], 
    direccionEnvio: null, 
    metodoDePago: null,
    tipoEntrega: null, 
    cantidadItems: 0,
    metodoDePagoId: null, 
    loading: false, 
    error: null, 
};

// Obtener el carrito del backend
export const fetchCarrito = createAsyncThunk(
    'cart/fetchCarrito',
    async (_, { getState, rejectWithValue }) => {
        const { auth } = getState();
        const token = auth.token;

        if (!token) {
            return rejectWithValue('Token no disponible.');
        }

        try {
            const response = await fetch('http://localhost:4002/carritos/usuarios/carrito', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Error al obtener el carrito.');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Resto de las acciones (como addItemToCarrito, updateShippingAddress, etc.) permanecen igual.

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCarritoId: (state, action) => {
            state.carritoId = action.payload;
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
            state.cantidadItems = action.payload.length; 
        },
        addCartItem: (state, action) => {
            state.cartItems.push(action.payload);
        },
        updateCartItem: (state, action) => {
            const { id, cantidad } = action.payload;
            const itemIndex = state.cartItems.findIndex((item) => item.id === id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cantidad = cantidad;
            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        },
        setDireccionEnvio: (state, action) => {
            state.direccionEnvio = action.payload;
            state.tipoEntrega = 'DELIVERY';
        },
        setRetiroEnLocal: (state) => {
            state.tipoEntrega = 'RETIRO_LOCAL';
            state.direccionEnvio = null;
        },
        setMetodoDePago: (state, action) => {
            state.metodoDePago = action.payload;
        },
        setMetodoDePagoId: (state, action) => {
            state.metodoDePagoId = action.payload === "EFECTIVO" ? null : action.payload;
        },
        clearCart: (state) => {
            state.carritoId = null;
            state.cartItems = [];
            state.direccionEnvio = null;
            state.metodoDePago = null;
            state.tipoEntrega = null;
            state.cantidadItems = 0;
            state.metodoDePagoId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarrito.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCarrito.fulfilled, (state, action) => {
                state.loading = false;
                state.carritoId = action.payload.id;
                state.cartItems = action.payload.items || [];
                state.cantidadItems = action.payload.items ? action.payload.items.length : 0;
            })
            .addCase(fetchCarrito.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al cargar el carrito.';
            });
    },
});

export const {
    setCarritoId,
    setCartItems,
    addCartItem,
    updateCartItem,
    removeCartItem,
    setDireccionEnvio,
    setRetiroEnLocal,
    setMetodoDePago,
    setMetodoDePagoId,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
