import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import useDarkModeStore from "../../Store/DarcModeStore";
import { AiOutlineDelete } from "react-icons/ai";
import { CardActionArea } from "@mui/material";

export default function GalleryAll() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    api
      .get("/gallery")
      .then((response) => {
        setGalleryItems(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          setValidationErrors(err.response.data.errors);
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/gallery/delete/${id}`)
      .then(() => {
        setGalleryItems(galleryItems.filter((item) => item._id !== id));
      })
      .catch((err) => {
        setError("Error deleting item: " + err.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <div className="container">
        <div
          className={`${
            darkMode ? "photo__all__wrapper-light" : "photo__all__wrapper-dark"
          }`}
        >
          {validationErrors.length > 0 && (
            <div className="validation-errors">
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
          {galleryItems.length === 0 ? (
            <div className="no-items">No images available in the gallery</div>
          ) : (
            <div className="phot__form__wrtapper">
              {galleryItems.map((item) => (
                <div key={item._id} className="gallery-item">
                  <CardActionArea className="delete" onClick={() => handleDelete(item._id)}>
                    <img
                      src={item.image}
                      alt="Gallery Item"
                      className="gallery-image"
                    />
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={() => handleDelete(item._id)}
                    />
                  </CardActionArea>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
