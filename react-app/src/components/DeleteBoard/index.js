import { useModal } from "../../context/Modal";
import * as boardsActions from "../../store/board";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./DeleteBoard.css";

const DeleteBoard = ({ board }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  console.log("board id", board.id);

  const deleteBoardClick = async () => {
    await dispatch(boardsActions.deleteBoard(board.id)).then(() => {
      dispatch(boardsActions.getUserBoards());
      history.push("/user");
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

export default DeleteBoard;
