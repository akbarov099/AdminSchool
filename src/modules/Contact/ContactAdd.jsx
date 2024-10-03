import React, { useState } from "react";
import useDarkModeStore from "../../Store/DarcModeStore";

export default function ContactAdd() {
  const { darkMode } = useDarkModeStore();
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://api.39ortomekteb.info/api/contact/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: fullName, message }),
    });

    const data = await response.json();

    if (data.success) {
      setFullName("");
      setMessage("");
      alert('Malumot muvaffaqiyatli yuborildi!');
    } else {
      console.error(data.message);
      alert('Xatolik yuz berdi: ' + data.message);
    }
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
