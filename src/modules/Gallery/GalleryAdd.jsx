import React, { useState } from "react";
import useDarkModeStore from "../../Store/DarcModeStore";
import useImageStore from "../../Store/useImageStore";
import Addphoto from "../../assets/images/addphoto.png";
import api from "../../utils/axiosInstance";

export default function GalleryAdd() {
  const { darkMode } = useDarkModeStore(); 
  const { uploadImage, uploadedImageUrl } = useImageStore(); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [imagePreviewUrl, setImagePreviewUrl] = useState(Addphoto); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); 
      setImagePreviewUrl(URL.createObjectURL(file)); 
      setErrorMessage(""); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Пожалуйста, выберите изображение перед отправкой.");
      return; 
    }

    uploadImage(selectedImage).then((url) => {
      sendData(url);
    });
  };

  const sendData = (imageUrl) => {
    const dataToSend = {
      image: imageUrl || null,
    };

    api
      .post("/gallery/create", dataToSend) 
      .then((response) => {
        alert("Изображение успешно добавлено!"); 
        setImagePreviewUrl(Addphoto); 
        setSelectedImage(null); 
        window.location.reload(); 
      })
      .catch((error) => {
        const errorMsg = error.response ? error.response.data : error.message;
        alert("Ошибка при добавлении изображения: " + errorMsg); 
      });
  };

  return (
    <section>
      <div className="container">
        <div
          className={`${
            darkMode ? "photo__wrapper-light" : "photo__wrapper-dark"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <button type="submit">Добавить</button>
            <div className="phot__form__wrtapper">
              <div className="phot__form__img">
                <label htmlFor="imageUpload">
                  <img src={imagePreviewUrl} alt="Add" />
                  <h4>{selectedImage ? "Фото добавлено!" : "Добавить фото"}</h4>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  onChange={handleImageChange}
                  className="hidden-file-input"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
