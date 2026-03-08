import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { apiService } from '../../services/api.service';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = { items: [], loading: false, error: null };

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const { data } = await apiService.get<{ data: Product[] }>('/products');
  return data.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false; state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message ?? 'Error cargando productos';
      });
  },
});

export default productSlice.reducer;