import React from "react";
import { CardActionArea, Modal, Box } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import useDarkModeStore from "../Store/DarcModeStore";

export default function ModalDelete({ open, setOpen, onDelete, id, name }) {
  const handleClose = () => setOpen(false);
  const { darkMode } = useDarkModeStore();

  const handleConfirmDelete = () => {
    onDelete(id);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
    >
      <Box
        className={`${darkMode ? "modal_box-light" : "modal_box-dark"}`}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="modal_delete">
          <div className="modal_delete__header">
            <h4>Удалить отзыв</h4>
            <IoClose className="modal_close" onClick={handleClose} />
          </div>
          <div className="modal_hr"></div>
          <div className="modal_delete__body">
            <h2>Удалить "{name}"?</h2>
            <div className="modal_delete__body-btns">
              <CardActionArea className="btns__1" onClick={handleClose}>
                <span>Cancel</span>
              </CardActionArea>
              <CardActionArea className="btns__2" onClick={handleConfirmDelete}>
                <MdDelete className="icon" /> Да удалить
              </CardActionArea>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
