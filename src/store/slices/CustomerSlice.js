import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`https://67b4d672a9acbdb38ed093b2.mockapi.io/api/products/allCustomers`, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
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

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://67b4d672a9acbdb38ed093b2.mockapi.io/api/products/allCustomers/${customerId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }
      return customerId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  customers: [],
  loadingCustomer: false,
  loadingDeleteCustomer: false,
  errorCustomer: null,
  errorDeleteCustomer: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loadingCustomer = true;
        state.errorCustomer = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loadingCustomer = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loadingCustomer = false;
        state.errorCustomer = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loadingDeleteCustomer = true;
        state.errorDeleteCustomer = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loadingDeleteCustomer = false;
        state.customers = state.customers.filter((customer) => customer.id !== action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loadingDeleteCustomer = false;
        state.errorDeleteCustomer = action.payload;
      });
  },
});

export default customerSlice.reducer;
