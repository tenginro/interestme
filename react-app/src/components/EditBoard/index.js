import BoardForm from "../BoardForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boardsActions from "../../store/board";

const EditBoard = ()=> {
 const dispatch = useDispatch();

const user_board = useSelector(state=> state)
console.log("user board:::===> ", user_board)

useEffect(()=> {
    dispatch(boardsActions.getUserBoards())
},[dispatch])

  return (
    <div>
        <h1>Hello From edit</h1>
      {/* <BoardForm formType="Create board" submitType="Create" /> */}
    </div>
  );
}

export default EditBoard;
