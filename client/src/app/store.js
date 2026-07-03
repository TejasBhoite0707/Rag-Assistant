import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/store/authSlice"
import workspaceReducer from "../features/workspace/store/workspaceSlice";
 export const store=configureStore({
    reducer:{
auth:authReducer,
workspace: workspaceReducer

    }
 })