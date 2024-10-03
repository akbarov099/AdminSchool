import React, { useState } from "react";
import User from "../../assets/images/user.jpg";
import useDarkModeStore from "../../Store/DarcModeStore";
import useImageStore from "../../Store/useImageStore";
import api from "../../utils/axiosInstance"; 

export default function Home() {
  const { darkMode } = useDarkModeStore();
  const { uploadImage, uploadedImageUrl } = useImageStore();
  const [formData, setFormData] = useState({
    full_name: "",
    subject: "",
    type: "Teacher",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setSelectedResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedImage) {
      uploadImage(selectedImage).then((url) => {
        console.log("Image uploaded successfully:", url);

        if (selectedResume) {
          uploadImage(selectedResume).then((resumeUrl) => {
            console.log("Resume uploaded successfully:", resumeUrl);
            sendData(url, resumeUrl);
          });
        } else {
          sendData(url, null); 
        }
      });
    } else {
      if (selectedResume) {
        uploadImage(selectedResume).then((resumeUrl) => {
          console.log("Resume uploaded successfully:", resumeUrl);
          sendData(null, resumeUrl); 
        });
      } else {
        sendData(null, null); 
      }
    }
  };

  const sendData = (imageUrl, resumeUrl) => {
    const dataToSend = {
      ...formData,
      image: imageUrl || null, 
      resume: resumeUrl || null, 
    };

    api.post("/teachers/create", dataToSend)
      .then((response) => {
        console.log("Teacher created successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error creating teacher:", error.response);
      });
  };

  return (
    <section>
      <div className="container">
        <div className={`${darkMode ? "home__wrapper-light" : "home__wrapper-dark"}`}>
          <form onSubmit={handleSubmit}>
            <button type="submit">Добавить</button>
            <div className="home__form__wrtapper">
              <div className="home__form__wrtapper">
                <div className="home__form__left">
                  <img src={uploadedImageUrl || User} alt="home" />
                  <h4>Добавить фото</h4>
                  <input type="file" onChange={handleImageChange} />

                  <h4>Добавить резюме</h4>
                  <input type="file" onChange={handleResumeChange} />
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
                      />
                    </div>
                    <div className="home__form__info">
                      <label>Предмет</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="home__form__info">
                      <label>Роль</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                      >
                        <option value="Teacher">Teacher</option>
                        <option value="Personal">Personal</option>
                      </select>
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