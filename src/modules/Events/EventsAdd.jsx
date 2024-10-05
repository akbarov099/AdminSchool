import React, { useState, useRef } from "react";
import api from "../../utils/axiosInstance";
import useDarkModeStore from "../../Store/DarcModeStore";
import useImageStore from "../../Store/useImageStore";
import img from "../../assets/images/addphoto.png";

export default function EventsAdd() {
  const { darkMode } = useDarkModeStore();
  const { uploadImage } = useImageStore();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState(""); 
  const [date, setDate] = useState(""); 
  const [imagePreview, setImagePreview] = useState(img);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imageAddedMessage, setImageAddedMessage] = useState(""); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
      setImageAddedMessage(""); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setImageAddedMessage("");

    if (!title || !date || !fileInputRef.current.files[0]) {
      setErrorMessage("Пожалуйста, заполните все поля и загрузите изображение.");
      return;
    }

    const file = fileInputRef.current.files[0];
    if (file) {
      uploadImage(file)
        .then((uploadedUrl) => {
          if (uploadedUrl) {
            setImageAddedMessage("Фото добавлено!"); 
            const requestBody = {
              title: title,
              body: JSON.stringify({ image: uploadedUrl, date: date }),
            };

            api.post("/blog/create", requestBody)
              .then((response) => {
                setSuccessMessage("Событие успешно добавлено!");
                alert("Событие успешно добавлено!");
                window.location.reload();
              })
              .catch((error) => {
                console.log("POST request error:", error.response);
                setErrorMessage("При добавлении события произошла ошибка.");
              });
          }
        })
        .catch(() => {
          setErrorMessage("Ошибка загрузки изображения.");
          alert("Ошибка загрузки изображения.");
        });
    }
  };

  return (
    <section>
      <div className="container">
        <div className={`${darkMode ? "events__add-light" : "events__add-dark"}`}>
          <form onSubmit={handleSubmit}>
            <button type="submit">Добавить</button>

            <div className="events__form__wrtapper">
              <div className="events__form__left">
                <div className="image-upload-wrapper">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <img src="" alt="Изображение не выбрано" />
                  )}
                  <h4>
                    {imagePreview && imagePreview !== img
                      ? "Фото добавлено!"
                      : "Добавить фото"}
                  </h4>
                  <input
                    type="file"
                    className="hidden-file-input"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    required
                  />
                </div>
              </div>

              <div className="events__form__right">
                <div className="events__form__right-top">
                  <div className="events__form__data">
                    <div className="events__form__info">
                      <label>Информация</label>
                      <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        required
                      />
                    </div>
                    <div className="events__form__info">
                      <label>Дата</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} 
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
