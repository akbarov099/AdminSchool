import React, { useState } from "react";
import User from "../../assets/images/user.jpg";
import useDarkModeStore from "../../Store/DarcModeStore";
import useImageStore from "../../Store/useImageStore";
import api from "../../utils/axiosInstance";

export default function HomeAdd() {
  const { darkMode } = useDarkModeStore();
  const { uploadImage } = useImageStore();
  const [formData, setFormData] = useState({
    full_name: "",
    subject: "",
    type: "Teacher",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(User);
  const [resumeAddedMessage, setResumeAddedMessage] = useState("Добавить резюме"); 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedResume(file);
      setResumeAddedMessage("Резюме добавлено!"); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Пожалуйста, добавьте фото.");
      return;
    }
    if (!selectedResume) {
      alert("Пожалуйста, добавьте резюме.");
      return;
    }

    uploadImage(selectedImage).then((url) => {
      uploadImage(selectedResume).then((resumeUrl) => {
        sendData(url, resumeUrl);
      });
    });
  };

  const sendData = (imageUrl, resumeUrl) => {
    const dataToSend = {
      ...formData,
      image: imageUrl || null,
      resume: resumeUrl || null,
    };

    api
      .post("/teachers/create", dataToSend)
      .then((response) => {
        alert("Учитель успешно создал:", response.data);
        setFormData({
          full_name: "",
          subject: "",
          type: "Teacher",
        });
        setSelectedImage(null);
        setSelectedResume(null);
        setImagePreviewUrl(User);
        setResumeAddedMessage("Добавить резюме"); 
      })
      .catch((error) => {
        alert("Учитель, создающий ошибку:", error.response);
      });
  };

  return (
    <section>
      <div className="container">
        <div
          className={`${
            darkMode ? "home__wrapper-light" : "home__wrapper-dark"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <button type="submit">Добавить</button>
            <div className="home__form__wrtapper">
              <div className="home__form__left">
                <div className="image-upload-wrapper">
                  <img src={imagePreviewUrl} alt="home" />
                  <h4>
                    {selectedImage ? "Фото добавлено!" : "Добавить фото"}
                  </h4>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden-file-input"
                    required
                  />
                </div>
              </div>

              <div className="home__form__right">
                <div className="home__form__right-top">
                  <h2>Данные учителя</h2>
                  <div className="home__form__data">
                    <div className="home__form__info">
                      <label>Имя Фамилия</label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="home__form__info">
                      <label>Предмет</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="home__form__info">
                      <label>Роль</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Teacher">Teacher</option>
                        <option value="Personal">Personal</option>
                      </select>
                    </div>
                    <div className="home__form__info">
                      <h4>{resumeAddedMessage}</h4> 
                      <div
                        className={`${
                          darkMode
                            ? "home__input__file-light"
                            : "home__input__file-dark"
                        }`}
                      >
                        <p>{selectedResume ? "Резюме добавлено!" : "Добавить PDF"}</p> 
                        <input
                          type="file"
                          onChange={handleResumeChange}
                          required
                        />
                      </div>
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
