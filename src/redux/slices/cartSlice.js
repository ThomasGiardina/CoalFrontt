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

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en fetchCarrito:', error.message);
            return rejectWithValue(error.message);
        }
    }
);


// Agregar un ítem al carrito
export const addItemToCarrito = createAsyncThunk(
    'cart/addItemToCarrito',
    async ({ carritoId, videojuegoId, cantidad }, { getState, rejectWithValue }) => {
        const { auth } = getState();
        const token = auth.token;

        if (!token || !carritoId) {
            return rejectWithValue('Token o carritoId no disponible.');
        }

        try {
            const response = await fetch(`http://localhost:4002/carritos/${carritoId}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ videojuegoId, cantidad }),
            });

            if (!response.ok) throw new Error('Error al agregar el ítem al carrito.');

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const updateShippingAddress = createAsyncThunk(
    'cart/updateShippingAddress',
    async (addressData, { dispatch }) => {
        dispatch(setDireccionEnvio(addressData));
        return addressData;
    }
);

export const deleteItemFromCarrito = createAsyncThunk(
    'cart/deleteItemFromCarrito',
    async (itemId, { getState, dispatch, rejectWithValue }) => {
        const { auth, cart } = getState();
        const token = auth.token;
        const carritoId = cart.carritoId;

        if (!token) {
            return rejectWithValue('Token no disponible.');
        }

        try {
            const response = await fetch(`http://localhost:4002/carritos/${carritoId}/items/${itemId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Error al eliminar el ítem del carrito.');

            return itemId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const updateCartItemAsync = createAsyncThunk(
    'cart/updateCartItem',
    async ({ id, cantidad }, { getState, rejectWithValue }) => {
        const { auth } = getState();
        const token = auth.token;
        const carritoId = getState().cart.carritoId;

        if (!token || !carritoId) {
            return rejectWithValue('Token o carritoId no disponible.');
        }

        try {
            const response = await fetch(`http://localhost:4002/carritos/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cantidad }),
            });
            return { id, cantidad };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
            state.metodoDePagoId = state.metodoDePagoId === null ? null : state.metodoDePagoId; 
        },
        setRetiroEnLocal: (state) => {
            state.tipoEntrega = 'RETIRO_LOCAL'; 
            state.direccionEnvio = null;
        },
        setMetodoDePago: (state, action) => {
            state.metodoDePago = action.payload;
        },
        setMetodoDePagoId: (state, action) => {
            if (action.payload === 'EFECTIVO') {
                state.metodoDePagoId = null;
                state.metodoDePago = 'EFECTIVO';
            } else {
                state.metodoDePagoId = action.payload;
            }
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
                const giftCards = state.cartItems.filter(item => item.isGiftCard === true);
                
                const newCartItems = Array.isArray(action.payload.items)
                    ? action.payload.items.map(item => ({
                        id: item.id,
                        cantidad: item.cantidad,
                        titulo: item.videojuego?.titulo || 'Sin título',
                        precio: item.videojuego?.precio || 0,
                        foto: item.videojuego?.foto || null,
                        plataforma: item.videojuego?.plataforma || 'Desconocida',
                        stock: item.videojuego?.stock || 0,
                    }))
                    : [];

                state.cartItems = newCartItems;
                state.cantidadItems = newCartItems.length;
                state.loading = false;
                state.carritoId = action.payload.id || null;
                state.loading = false;
                state.error = action.payload || 'Error al cargar el carrito.';
            })
            .addCase(addItemToCarrito.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCarrito.fulfilled, (state, action) => {
                // El backend devuelve solo un mensaje; refrescamos luego con fetchCarrito
                state.loading = false;
            })
            .addCase(addItemToCarrito.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al agregar el ítem al carrito.';
            })
            .addCase(updateCartItemAsync.fulfilled, (state, action) => {
                const { id, cantidad } = action.payload;
                const itemIndex = state.cartItems.findIndex((item) => item.id === id);
                if (itemIndex >= 0) {
                    state.cartItems[itemIndex].cantidad = cantidad;
                }
            })
            .addCase(updateCartItemAsync.rejected, (state, action) => {
                state.error = action.payload || 'Error al actualizar la cantidad.';
            })
            .addCase(deleteItemFromCarrito.fulfilled, (state, action) => {
                const itemId = action.payload; 
    
                state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    
                state.cantidadItems = state.cartItems.length;
            })
            .addCase(deleteItemFromCarrito.rejected, (state, action) => {
                console.error("Error al eliminar el ítem:", action.payload);
                state.error = action.payload || 'Error al eliminar el ítem.';
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
