import { useEffect, useState } from "react";
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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [nameCount, setNameCount] = useState(0);
  const [desCount, setDesCount] = useState(0);
  const [description, setDescription] = useState(newBoard.description);
  const [secret, setSecret] = useState(newBoard.secret);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(()=> {
    const err = [];
    if (name.length<3) err.name = "* Name is required";
    if (name.length>50) err.name = "* The max is 50 characters."
    if (!description.length) err.description = "* Description is required";
    if (description.length>255) err.description = "* Description length can only have 255 characters." 
    setErrors(err)
  },[name, description])

  if (!currentUser) return <Redirect to="/" />;

  const submitNewBoardHandler = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (submitType === "Edit" && !Boolean(Object.values(errors).length)) {
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

    if (submitType === "Create" && !Boolean(Object.values(errors).length)) {
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


  const maxCharClassNameHandle = (desCount) => {
    if (desCount===255) return "showCharacterLength reachedMax"
    return "showCharacterLength"
  }
  const nameCountClassHandler = (nameCount) => {
    if(nameCount===50) return "showCharacterLength reachedMax"
    return "showCharacterLength"
  }

  return (
    <div className="board-form_container">
      <form onSubmit={submitNewBoardHandler}>
        <div id="board-form">
          <h1 id="board-form_title">{formType}</h1>
          <label>Name</label>
          <input
            maxLength={50}
            className="board-form_input"
            type="text"
            id="name"
            value={name}
            placeholder='Like "Places to Go" or "Recipes to Make"'
            onChange={(e) => {
              setName(e.target.value)
              setNameCount(e.target.value.length)
            }}
            required
          ></input>
          <p className={nameCountClassHandler(nameCount)}>{nameCount}/50 characters</p>
          {hasSubmitted ? (
                <p className="error"> {errors.name}</p>
              ) : (
                <p className="noErrorDisplay">{"  "}</p>
              )}
          <br />
          <label>Description</label>
          <textarea
            maxLength={255}
            className="board-form_input-field"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <p className={maxCharClassNameHandle(desCount)}>{desCount} /255 characters</p>
          {hasSubmitted ? (
                <p className="error"> {errors.description}</p>
              ) : (
                <p className="noErrorDisplay">{"  "}</p>
              )}
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
                So only you can see it.
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
