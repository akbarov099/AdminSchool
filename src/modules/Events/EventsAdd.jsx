import React, { useState } from "react";
import api from "../../utils/axiosInstance";
import useDarkModeStore from "../../Store/DarcModeStore";
import Event from "../../assets/images/events.png";

export default function EventsAdd() {
  const { darkMode } = useDarkModeStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);  // Send title
    formData.append("description", description);  // Send description
    formData.append("image", image);  // Send image
  
    // Post data to the backend API
    api
      .post("/blog/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then((response) => {
        // Logging the received response
        console.log("Response data:", response.data);
        if (response.data.success) {
          // Display success message
          alert("Blog created successfully!");
  
          // Accessing the response details (title, description, and image)
          console.log("Title:", response.data.data.title);
          console.log("Description:", response.data.data.description);
          console.log("Image URL:", response.data.data.image);
  
          // Reset the form after successful submission
          setTitle("");
          setDescription("");
          setImage(null);
        }
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
        alert("Failed to create blog.");
      });
  };
  

  return (
    <section>
      <div className="container">
        <div
          className={`${
            darkMode ? "events__add-light" : "events__add-dark"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <button type="submit">Добавить</button>
            <div className="events__form__wrtapper">
              <div className="events__form__left">
                <div className="image-upload-wrapper">
                  <img
                    src={image ? URL.createObjectURL(image) : Event}
                    alt="Preview"
                    className="image-preview"
                  />
                  <h4>Добавить фото</h4>
                  <input
                    type="file"
                    className="hidden-file-input"
                    onChange={handleImageChange}
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
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="events__form__info">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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