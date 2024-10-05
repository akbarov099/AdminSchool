import React, { useState } from "react";
import useDarkModeStore from "../../Store/DarcModeStore";
import api from "../../utils/axiosInstance";

export default function ContactAdd() {
  const { darkMode } = useDarkModeStore();
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/contact/create', {
      name: fullName,
      message,
    })
    .then((response) => {
      if (response.data.success) {
        setFullName("");
        setMessage("");
        alert('Отзыв успешно отправлена!');
      } else {
        console.error(response.data.message);
        alert('Произошла ошибка: ' + response.data.message);
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Произошла ошибка: ' + (error.response ? error.response.data : error.message));
    });
  };

  return (
    <section>
      <div className="container">
        <div
          className={`${
            darkMode ? "contact__wrapper-light" : "contact__wrapper-dark"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <button type="submit">Добавить</button>
            <div className="contact__form__wrapper">
              <div className="contact__form__data">
                <div className="contact__form__info">
                  <label>Имя Фамилия</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="contact__form__info">
                  <label>Сообщение</label>
                  <div className="contact__number">
                    <input 
                      type="text" 
                      name="message" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      required 
                    />
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
