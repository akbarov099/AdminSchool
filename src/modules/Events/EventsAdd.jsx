import React, { useState, useRef } from "react";
import api from "../../utils/axiosInstance";
import useDarkModeStore from "../../Store/DarcModeStore";
import useImageStore from "../../Store/useImageStore";

export default function EventsAdd() {
  const { darkMode } = useDarkModeStore();
  const { uploadImage } = useImageStore();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState(""); // Состояние для title
  const [date, setDate] = useState(""); // Состояние для date

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    if (file) {
      uploadImage(file).then((uploadedUrl) => {
        if (uploadedUrl) {
          console.log('Загруженный URL:', uploadedUrl);

          const requestBody = {
            title: title,
            body:  JSON.stringify({ image: uploadedUrl, date: date }),
          };

          console.log('Отправляемый объект:', requestBody);

          api.post('/blog/create', requestBody)
            .then(response => {
              console.log('Успешный POST запрос:', response.data);
            })
            .catch(error => {
              console.log('Ошибка POST запроса:', error.response);
            });
        }
      });
    }
  };

  return (
    <section>
      <div className="container">
        <div className={`${darkMode ? "events__add-light" : "events__add-dark"}`}>
          <form onSubmit={handleSubmit}>
            <button type="submit">
              Добавить
            </button>
            <div className="events__form__wrtapper">
              <div className="events__form__left">
                <div className="image-upload-wrapper">
                  <h4>Добавить фото</h4>
                  <input
                    type="file"
                    className="hidden-file-input"
                    ref={fileInputRef}
                    required
                  />
                </div>
              </div>

              <div className="events__form__right">
                <div className="events__form__right-top">
                  <div className="events__form__data">
                    <div className="events__form__info">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Устанавливаем title
                        required
                      />
                    </div>
                    <div className="events__form__info">
                      <label>Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} // Устанавливаем date
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
};