import { create } from 'zustand';
import api from '../utils/axiosInstance';

const useImageStore = create((set) => ({
  uploadedImageUrl: null, 
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post('/upload', formData)
      .then((response) => {
        set({ uploadedImageUrl: response.data.file }); 
        return response.data.file; 
      })
      .catch((error) => {
        console.log('Ошибка загрузки изображения:', error.response);
        return null;
      });
  },
}));

export default useImageStore;