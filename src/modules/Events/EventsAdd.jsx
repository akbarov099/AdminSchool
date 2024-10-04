import React, { useState } from "react";
import api from "../../utils/axiosInstance";
import useDarkModeStore from "../../Store/DarcModeStore";
import useImageStore from "../../Store/useImageStore"; // Import your image store
import Event from "../../assets/images/events.png";

export default function EventsAdd() {
  const { darkMode } = useDarkModeStore();
  const { uploadImage } = useImageStore(); // Use image store
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track image upload status

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    setIsUploading(true);

    // Upload the image first
    const uploadedImage = await uploadImage(image);
    setIsUploading(false);

    if (!uploadedImage) {
      alert("Image upload failed. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    
    // Construct the body with the description and uploaded image URL
    const bodyContent = JSON.stringify({
      description: description,
      image: uploadedImage, // Use the uploaded image URL from the API response
    });

    formData.append("body", bodyContent);

    // Post data to the backend API
    api
      .post("/blog/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Response data:", response.data);
        if (response.data.success) {
          alert("Blog created successfully!");

          // Log the response data, including title and body
          const blogData = response.data.data;
          console.log("Title:", title); // Log the title
          console.log("Description:", description); // Log the description
          console.log("Image URL:", uploadedImage); // Log the uploaded image URL

          // If the backend returns the title and body, log them
          console.log("Response Title:", blogData.title); // Assuming the response includes this
          console.log("Response Body:", blogData.body); // Assuming the response includes this

          // Reset form fields
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
        <div className={`${darkMode ? "events__add-light" : "events__add-dark"}`}>
          <form onSubmit={handleSubmit}>
            <button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Добавить"}
            </button>
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
