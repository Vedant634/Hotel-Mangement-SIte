import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

export const ProtectedRoute = ({ element }) => {
    const location = useLocation();
    const apiService = ApiService(); // Instantiate ApiService

    return apiService.isAuthenticated() ? (
        element // Render the passed element directly
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export const AdminRoute = ({ element }) => {
    const location = useLocation();
    const apiService = ApiService(); // Instantiate ApiService

    return apiService.isAdmin() ? (
        element // Render the passed element directly
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};
