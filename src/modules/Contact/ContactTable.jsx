import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import ModalDelete from "../../Components/ModalDelete"; 
import { MdEdit } from "react-icons/md";
import useDarkModeStore from "../../Store/DarcModeStore";
import { MdDelete } from "react-icons/md";
import ModalUpdate from "../../Components/ModalUpdate"; 

export default function ContactTable() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { darkMode } = useDarkModeStore();


  useEffect(() => {
    api
      .get("/contact")
      .then((response) => {
        if (response.data.success) {
          setReviews(response.data.data);
        } else {
          throw new Error("Failed to fetch reviews");
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const handleEditClick = (review) => {
    setSelectedReview(review);
    setUpdateModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleting(true);
    api
      .delete(`/contact/delete/${id}`)
      .then((response) => {
        if (response.data.success) {
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review._id !== id)
          );
          setModalOpen(false);
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        alert("Error deleting review. Please try again.");
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const handleUpdate = (updatedReview) => {
    api
      .put(`/contact/update/${updatedReview._id}`, updatedReview)
      .then((response) => {
        if (response.data.success) {
          setReviews((prevReviews) =>
            prevReviews.map((review) =>
              review._id === updatedReview._id ? updatedReview : review
            )
          );
          setUpdateModalOpen(false);
        } else {
          alert("Update failed: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        alert("Error updating review. Please try again.");
      });
};


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container">
        <div
          className={`${
            darkMode ? "contact-review-light" : "contact-review-dark"
          }`}
        >
          <h3>Отзывы</h3>
          <div className="contact-hero__reviews">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div className="contact__Wrapper" key={review._id}>
                  <blockquote>
                    <p>"{review.message}"</p>
                    <cite>– {review.name}</cite>
                  </blockquote>
                  <div className="contact__icons">
                    <MdEdit
                      className="contact-edit"
                      onClick={() => handleEditClick(review)}
                    />
                    <MdDelete
                      className="contact-delete"
                      onClick={() => handleDeleteClick(review)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>Отзывы отсутствуют.</p>
            )}
          </div>
        </div>
      </div>
      {selectedReview && (
        <ModalDelete
          open={modalOpen}
          setOpen={setModalOpen}
          onDelete={handleDelete}
          id={selectedReview._id}
          name={selectedReview.name}
        />
      )}
      {selectedReview && (
        <ModalUpdate
          open={updateModalOpen}
          setOpen={setUpdateModalOpen}
          onUpdate={handleUpdate}
          review={selectedReview}
        />
      )}
      {deleting && <p> </p>}
    </>
  );
}
