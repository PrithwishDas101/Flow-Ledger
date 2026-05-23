import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./UserContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPaths.js";

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Don't fetch if we already have a user AND a valid token
        if (user && localStorage.getItem("token")) return;

        // Check if user has a token (authenticated)
        const token = localStorage.getItem("token");
        if (!token) return; // No token, not authenticated yet

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch user info:", err);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        }

    }, []); // Empty dependency array - only run once on mount
};
