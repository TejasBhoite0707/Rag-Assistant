import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} from "../api/authAPI.js";

const initialState={
    user:null,
    isAuthenticated:false,
    isLoading:false,
    error:null,
}

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const response = await registerUser(userData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const response = await loginUser(userData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await logoutUser();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "auth/currentUser",
    async (_, thunkAPI) => {
        try {
            const response = await getCurrentUser();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Unable to fetch user"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {

        // ============================
        // Register
        // ============================

        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })

            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // ============================
        // Login
        // ============================

        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.user = null;
                state.isAuthenticated = false;
            });

        // ============================
        // Logout
        // ============================

        builder
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // ============================
        // Current User
        // ============================

        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })

            .addCase(fetchCurrentUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    }
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;