import BoardForm from "../BoardForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boardsActions from "../../store/board";

const EditBoard = ({boardId})=> {
 const dispatch = useDispatch();

const user_board = useSelector((state) => state.boards.userBoards[+boardId]);
console.log("user board:::===> ", user_board)

useEffect(()=> {
    dispatch(boardsActions.getUserBoards())
},[dispatch])

if (!user_board) return null
  return (
    <div>
        <h1>Hello From edit</h1>
      <BoardForm formType="Edit board" submitType="Edit" newBoard={user_board} />
    </div>
  );
}

export default EditBoard;
