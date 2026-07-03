import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import WorkspaceDetails from "../features/workspace/pages/WorkspaceDetails";

const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>

                            <Login />

                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>

                            <Register />

                        </PublicRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/workspace/:id"
                    element={
                        <ProtectedRoute>
                            <WorkspaceDetails />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

};

export default AppRoutes;