import BoardForm from "../BoardForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boardsActions from "../../store/board";

const EditBoard = ({ board }) => {
  const dispatch = useDispatch();

  const user_board = useSelector((state) => state.boards.userBoards[board.id]);
  console.log("user board:::===> ", user_board);

  useEffect(() => {
    dispatch(boardsActions.getUserBoards());
  }, [dispatch]);

  if (!user_board) return null;
  return (
    <div>
      <BoardForm
        formType="Edit your board"
        submitType="Edit"
        newBoard={user_board}
        existing={true}
      />
    </div>
  );
};

export default EditBoard;
