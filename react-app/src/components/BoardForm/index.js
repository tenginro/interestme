import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boardsActions from "../../store/board";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./BoardForm.css";
const BoardForm = ({ newBoard, submitType, formType, existing }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const [name, setName] = useState(newBoard.name);
  const [description, setDescription] = useState(newBoard.description);
  const [secret, setSecret] = useState(newBoard.secret);
  const currentUser = useSelector((state) => state.session.user);

  if (!currentUser) return <Redirect to="/" />;

  const submitNewBoardHandler = async (e) => {
    e.preventDefault();

    if (submitType === "Edit") {
      await dispatch(
        boardsActions.updateBoard(
          {
            name,
            description,
            secret,
          },
          newBoard.id
        )
      )
        .then(() => {
          dispatch(boardsActions.getBoardDetail(newBoard.id));
          dispatch(boardsActions.getUserBoards());
          closeModal();
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    if (submitType === "Create") {
      newBoard = await dispatch(
        boardsActions.createBoard(
          {
            name,
            description,
            secret,
          },
          newBoard.id
        )
      )
        .then(async (res) => {
          // dispatch(boardsActions.getUserBoards());
          history.push(`/boards/${res.board.id}`);
          closeModal();
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };
  if (!newBoard) return null;

  return (
    <div className="board-form_container">
      <form onSubmit={submitNewBoardHandler}>
        <div id="board-form">
          <h1 id="board-form_title">{formType}</h1>
          <label>Name</label>
          <input
            className="board-form_input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <br />
          <label>Description</label>
          <textarea
            className="board-form_input-field"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <br />
          <div className="secretCheckboxContainer">
            <div className="secretCheckboxFirstLine">
              <input
                type="checkbox"
                checked={secret}
                id="secret"
                onChange={(e) => setSecret(e.target.checked)}
              ></input>
            </div>
            <div className="secretCheckboxSecondLine">
              <div className="secretCheckboxSecondFirst">
                Keep this board secret
              </div>
              <div className="secretCheckboxSecondSecond">
                So only you can see it
              </div>
            </div>
          </div>
          <br />
          <div className="create_board-btn-div">
            <button className="create_board-btn" type="submit">
              {existing ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BoardForm;
