import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    password: null,
    loading: false,
    isAuth: false,
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    localStorage.setItem("authToken", userData.password);
                    resolve({ status: 200, email: userData.email, password: userData.password });
                }, 3000);
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const signUpUser = createAsyncThunk(
    "auth/signUpUser",
    async (userData, { rejectWithValue }) => {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    localStorage.setItem("authToken", userData.password);
                    localStorage.setItem("userName", userData.name);
                    resolve({ status: 200, email: userData.email, password: userData.password });
                }, 3000);
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.email = null;
            state.password = null;
            state.isAuth = false;
            localStorage.removeItem("authToken");
            localStorage.removeItem("userName");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = true;
                state.email = action.payload.email;
                state.password = action.payload.password;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = true;
                state.email = action.payload.email;
                state.password = action.payload.password;
            })
            .addCase(signUpUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
