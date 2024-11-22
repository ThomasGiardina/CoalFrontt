import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
    carritoId: null, 
    cartItems: [], 
    direccionEnvio: null, 
    metodoDePago: null,
    tipoEntrega: null, // DELIVERY o RETIRO_LOCAL 
    cantidadItems: 0,
    metodoDePagoId: null, // ID del método de pago
    loading: false, 
    error: null, 
};

// Obtener el carrito del usuario
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

// Agregar un ítem al carrito
export const addItemToCarrito = createAsyncThunk(
    'cart/addItemToCarrito',
    async ({ carritoId, videojuegoId, cantidad }, { getState, dispatch, rejectWithValue }) => {
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

            dispatch(fetchCarrito());
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Actualizar dirección de envío
export const updateShippingAddress = createAsyncThunk(
    'cart/updateShippingAddress',
    async (addressData, { dispatch }) => {
        dispatch(setDireccionEnvio(addressData));
        return addressData; 
    }
);


// Eliminar un ítem del carrito
export const deleteItemFromCarrito = createAsyncThunk(
    'cart/deleteItemFromCarrito',
    async (itemId, { getState, dispatch, rejectWithValue }) => {
        const { auth } = getState();
        const token = auth.token;

        if (!token) {
            return rejectWithValue('Token no disponible.');
        }

        try {
            const response = await fetch(`http://localhost:4002/carritos/items/${itemId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Error al eliminar el ítem del carrito.');

            const updatedCartResponse = await fetch('http://localhost:4002/carritos/usuarios/carrito', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!updatedCartResponse.ok) throw new Error('Error al obtener el carrito actualizado.');

            const updatedCartData = await updatedCartResponse.json();
            
            dispatch(setCartItems(updatedCartData.items || []));

            return itemId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Actualizar un ítem en el carrito
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
                body: JSON.stringify({ cantidad })
            });

            if (!response.ok) {
                console.log("Error en la actualización", await response.text());
            } else {
                console.log("Cantidad actualizada exitosamente");
            }
            return { id, cantidad }; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Reducers para el carrito
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCarritoId: (state, action) => {
            state.carritoId = action.payload;
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
            state.cantidadItems = action.payload.length; // Calcula la cantidad de items
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
            state.tipoEntrega = 'DELIVERY'; // Asigna tipo de entrega como DELIVERY
            state.metodoDePagoId = state.metodoDePagoId === null ? null : state.metodoDePagoId; // Asegura que el método de pago no cambie
        },
        setRetiroEnLocal: (state) => {
            state.tipoEntrega = 'RETIRO_LOCAL'; // Asigna tipo de entrega como RETIRO_LOCAL
            state.direccionEnvio = null; // Limpia la dirección de envío
        },
        setMetodoDePago: (state, action) => {
            state.metodoDePago = action.payload;
        },
        setMetodoDePagoId: (state, action) => {
            if (action.payload === "EFECTIVO") {
                state.metodoDePagoId = null; // Si es EFECTIVO, metodoDePagoId es null
                state.metodoDePago = "EFECTIVO";
            } else {
                state.metodoDePagoId = action.payload; // Guarda el ID del método de pago
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
                state.loading = false;
                state.carritoId = action.payload.id;
                state.cartItems = action.payload.items || [];
                state.cantidadItems = action.payload.items ? action.payload.items.length : 0; // Calcula cantidad de items
            })
            .addCase(fetchCarrito.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al cargar el carrito.';
            })
            .addCase(addItemToCarrito.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCarrito.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems.push(action.payload);
            })
            .addCase(addItemToCarrito.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al agregar el ítem al carrito.';
            })
            .addCase(updateShippingAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateShippingAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.direccionEnvio = action.payload; 
            })
            .addCase(updateShippingAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al actualizar la dirección de envío.';
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
