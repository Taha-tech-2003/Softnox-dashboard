import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`https://67b4d672a9acbdb38ed093b2.mockapi.io/api/products/allProducts`, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        return rejectWithValue("Request timed out");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://67b4d672a9acbdb38ed093b2.mockapi.io/api/products/allProducts/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  loadingProduct: false,
  loadingDelete: false,
  errorProduct: null,
  errorDelete: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProduct = true;
        state.errorProduct = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProduct = false;
        state.errorProduct = action.payload;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.loadingDelete = true;
        state.errorDelete = null;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.loadingDelete = false;
        state.errorDelete = action.payload;
      });
  },
});

export default productSlice.reducer;
