import { create } from 'zustand';
import api from '../utils/axiosInstance';

const useImageStore = create((set) => ({
    imageUrl: null,
    uploadImage: (file) => {
        if (!file) return Promise.reject("No file selected");

        const formData = new FormData();
        formData.append('file', file);  

        return api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                const imageUrl = response.data.data.file;
                set({ imageUrl });
                return imageUrl;
            })
            .catch(error => {
                console.error("Image upload failed:", error.response ? error.response.data : error.message);
                set({ imageUrl: null });
                throw error;
            });
    },
}));

export default useImageStore;