import React from "react";
import * as pinsActions from "../../store/pin";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function DeleteModal({ pin }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const ClickYes = async (e) => {
    e.preventDefault();
    await dispatch(pinsActions.deletePin(pin));
    await closeModal();
    await dispatch(pinsActions.getUserPins());
    return history.push(`/user`);
  };

  const ClickNo = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="container">
      <h1 className="title_text">Are you sure?</h1>
      <h4 className="confirmation-text">
        Once you delete a Pin, you can't undo it!
      </h4>
      <div className="button-container">
        {/* <div className="submitDiv de"> */}
        <button onClick={ClickYes} className="confirmation-button">
          Yes Delete Pin!
        </button>
        {/* </div> */}
      </div>
      <div className="submitDiv de">
        <button onClick={ClickNo} className="cancel-button">
          No Keep Pin!
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
