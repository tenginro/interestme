import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boardsActions from "../../store/board";
import { useHistory, useParams, Redirect} from "react-router-dom";

const BoardForm = ({ newBoard, submitType, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});


const [name, setName] = useState(newBoard.name)
const [description, setDescription] = useState(newBoard.description);
const currentUser = useSelector(state=> state.session.user)

// const boardById = useSelector(state=> state.boards)
// console.log("board by id::::", boardById);

if (!currentUser) return <Redirect to="/" />;

const submitNewBoardHandler = async (e) => {
    e.preventDefault();
    if (submitType === "Create") {
        newBoard = await dispatch(
          boardsActions.createBoard({
            name,
            description,
          }, newBoard.id)
        )
          .then((res) => {
            history.push(`/boards/${res.board.id}`);
          })
          .catch(async (response) => {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
          });
    }
}
if (!newBoard) return null

  return (
    <div>
      <form onSubmit={submitNewBoardHandler}>
        <h1>{formType}</h1>
        <label>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <br />
        <label>Description</label>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BoardForm;
