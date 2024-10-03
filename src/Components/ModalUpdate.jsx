import React, { useState } from "react";
import useDarkModeStore from "../Store/DarcModeStore";
import { CardActionArea, Modal, Box } from "@mui/material";
import { IoClose } from "react-icons/io5";

export default function ModalUpdate({ open, setOpen, onUpdate, review }) {
  const [message, setMessage] = useState(review?.message || "");
  const [name, setName] = useState(review?.name || "");
  const { darkMode } = useDarkModeStore();

  const handleClose = () => setOpen(false);

  const handleUpdate = () => {
    onUpdate({ ...review, message, name });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="update-review-title"
      aria-describedby="update-review-description"
    >
      <Box className={`${ darkMode ? "modal_box-light" : "modal_box-dark"}`}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          padding: "16px"
        }}
      >
        <div className="modal__update">
          <div className="modal__update__header">
            <h4>Изменит</h4>
            <IoClose className="modal_close" onClick={handleClose} />
          </div>
          <div className="modal_hr"></div>
          <div className="modal__update__body">
            <div className="modal__input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="modal__update__body-btns">
              <CardActionArea className="btns__1" onClick={handleClose}>
                <span>Cancel</span>
              </CardActionArea>
              <CardActionArea className="btns__2" onClick={handleUpdate}>
                <span>Save Changes</span>
              </CardActionArea>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
