import React, { useState } from "react";
import User from "../../assets/images/user.jpg";
import useDarkModeStore from "../../Store/DarcModeStore";
import useImageStore from "../../Store/useImageStore";
import api from "../../utils/axiosInstance";

export default function Home() {
  const { darkMode } = useDarkModeStore();
  const { uploadImage } = useImageStore();
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    role: "Teacher",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.subject) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      // Submit the form data along with the image URL
      await api.post("/teachers/create", {
        full_name: formData.fullName,
        type: formData.role,
        subject: formData.subject,
        file: imageUrl, // Uploaded image URL
      });

      alert("Teacher successfully created!");
    } catch (error) {
      console.error("Failed to create teacher:", error);
      alert("Error creating teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container">
        <div className={`${darkMode ? "home__wrapper-light" : "home__wrapper-dark"}`}>
          <form onSubmit={handleSubmit}>
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Добавить"}
            </button>
            <div className="home__form__wrtapper">
              <div className="home__form__left">
                <img src={User} alt="home" />
                <h4>Добавить фото</h4>
                <input type="file" onChange={handleImageChange} />
              </div>

              <div className="home__form__right">
                <div className="home__form__right-top">
                  <h2>Данные учителя</h2>
                  <div className="home__form__data">
                    <div className="home__form__info">
                      <label>Имя Фамилия</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
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
                        name="role"
                        value={formData.role}
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
