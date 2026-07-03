import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    getWorkspaces,
    createWorkspace,
    deleteWorkspace,
    getWorkspaceById
} from "../api/workspaceAPI";

const initialState = {
    workspaces: [],
    selectedWorkspace: null,
    isLoading: false,
    error: null
};

// =====================================
// Fetch All Workspaces
// =====================================

export const fetchWorkspaces = createAsyncThunk(
    "workspace/fetchAll",
    async (_, thunkAPI) => {
        try {
            return await getWorkspaces();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch workspaces"
            );
        }
    }
);

// =====================================
// Create Workspace
// =====================================

export const addWorkspace = createAsyncThunk(
    "workspace/create",
    async (data, thunkAPI) => {
        try {
            return await createWorkspace(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create workspace"
            );
        }
    }
);

// =====================================
// Delete Workspace
// =====================================

export const removeWorkspace = createAsyncThunk(
    "workspace/delete",
    async (workspaceId, thunkAPI) => {
        try {
            await deleteWorkspace(workspaceId);
            return workspaceId;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete workspace"
            );
        }
    }
);

// =====================================
// Get Workspace By Id
// =====================================

export const fetchWorkspaceById = createAsyncThunk(
    "workspace/fetchById",
    async (workspaceId, thunkAPI) => {
        try {
            return await getWorkspaceById(workspaceId);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Workspace not found"
            );
        }
    }
);

const workspaceSlice = createSlice({
    name: "workspace",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // Fetch Workspaces
            .addCase(fetchWorkspaces.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchWorkspaces.fulfilled, (state, action) => {
                state.isLoading = false;
                state.workspaces = action.payload;
            })

            .addCase(fetchWorkspaces.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Create Workspace
            .addCase(addWorkspace.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(addWorkspace.fulfilled, (state, action) => {
                state.isLoading = false;
                state.workspaces.push(action.payload);
            })

            .addCase(addWorkspace.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete Workspace
            .addCase(removeWorkspace.fulfilled, (state, action) => {
                state.workspaces = state.workspaces.filter(
                    (workspace) => workspace.id !== action.payload
                );
            })

            // Fetch Workspace By Id
            .addCase(fetchWorkspaceById.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(fetchWorkspaceById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedWorkspace = action.payload;
            })

            .addCase(fetchWorkspaceById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    }
});

export default workspaceSlice.reducer;