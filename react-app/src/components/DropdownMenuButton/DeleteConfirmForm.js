import { useModal } from "../../context/Modal";
import * as boardsActions from "../../store/board";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const DeleteConfirmForm = ({ board }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteBoardClick = (e) => {
    e.preventDefault();
    dispatch(boardsActions.deleteBoard(board.id))
    .then(() => {
      history.push("/boards/current");
      closeModal();
    });
  };

  const cancelSubmit = () => {
    closeModal();
  };

  return (
    <div className="container">
      <div className="title_text">Confirm Delete</div>
      <div className="confirmation-text">
        Are you sure you want to delete this board?
      </div>
      <div className="button-container">
        <button
          className="confirmation-button"
          onClick={() => deleteBoardClick()}
        >
          Yes Delete Board!
        </button>
      </div>
      <div>
        <button className="cancel-button" onClick={() => cancelSubmit()}>
          No Keep Board!
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmForm;
