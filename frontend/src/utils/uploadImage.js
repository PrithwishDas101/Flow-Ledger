import axiosInstance from "./axiosInstance.js";
import { API_PATHS } from "./apiPaths.js";

export const uploadImage = async (imageFile) => {
    try {
        const formData = new FormData();

        formData.append("image", imageFile);

        const response = await axiosInstance.post(
            API_PATHS.IMAGE.UPLOAD_IMAGE,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error(
            error.response?.data?.message || "Image upload failed."
        );

        throw error;
    }
};