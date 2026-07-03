import api from "../../../api/axios";

export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return {
        success: response.data.success,
        message: response.data.message
    };
};

export const loginUser = async (userData) => {
    const response = await api.post("/auth/login", userData);
    console.log("USER DATA",response.data);
    
    return response.data.user;
};

export const getCurrentUser = async () => {
    const response = await api.get("/profile");
    return response.data.user;
};

export const logoutUser = async () => {
    const response = await api.post("/auth/logout");
    return true;
};