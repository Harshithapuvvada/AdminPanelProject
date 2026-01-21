import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ keyword = '', category = '' } = {}) => {
    let url = `/api/products?search=${keyword}`;
    if (category) url += `&category=${category}`;
    const response = await axios.get(url);
    return response.data;
});

// Helper for protected requests
const getAuthConfig = (thunkAPI) => {
    const auth = thunkAPI.getState().auth;
    const token = auth && auth.user ? auth.user.token : null;

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const addProduct = createAsyncThunk('products/addProduct', async (product, thunkAPI) => {
    try {
        const config = getAuthConfig(thunkAPI);
        const response = await axios.post('/api/products', product, config);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
    try {
        const config = getAuthConfig(thunkAPI);
        await axios.delete(`/api/products/${id}`, config);
        return id;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    }
});

export default productsSlice.reducer;
