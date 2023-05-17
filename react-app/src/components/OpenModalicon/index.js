import React from "react";
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom";

function OpenModalicon({
  modalComponent,
  onItemClick,
  onModalClose,
  iconType,
  pin,
}) {
  // Consume ModalContext
  const { setModalContent, setOnModalClose } = useModal();

  // Create onClick function
  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  // return (
  //     <li onClick={onClick}>{itemText}</li>
  // )
  if (iconType === "trashCan") {
    return (
      <button className="editButton" onClick={onClick}>
        <i className="fa-solid fa-trash"></i>
      </button>
    );
  }
  if (iconType === "editPen") {
    return (
      <button className="editButton" onClick={onClick}>
        <i className="fa-solid fa-pen"></i>
      </button>
    );
  }

  if (iconType === "create a board") {
    return <button className="createButton" onClick={onClick}></button>;
  }
}

export default OpenModalicon;

