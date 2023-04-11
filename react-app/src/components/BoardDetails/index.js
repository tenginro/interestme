// Necessary imports
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBoardDetail } from "../../store/board";
import PinGalleryCard from "../PinGalleryCard";
import { useModal } from "../../context/Modal";
import EditBoard from "../EditBoard";
import * as boardsActions from "../../store/board";
import { useHistory } from "react-router-dom";

function BoardDetails() {
  // Extract parameter variables from parameter object
  const { boardId } = useParams();
  console.log("id: ", boardId);
  const history = useHistory();
  // Create dispatch method
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const { closeModal } = useModal();
  // Subscribe to single board slice of state
  const board = useSelector((state) => state.boards.singleBoard);
  console.log("board:::::", board);
  // Subscribe to user session slice of state
  const currentUser = useSelector((state) => state.session.user);

  // Upon component render, dispatch the action to load the single board into the redux store for retrieval
  // let board
  useEffect(() => {
    dispatch(getBoardDetail(boardId));
  }, [dispatch, boardId]);

  const deleteBoardClick = (e) => {
    e.preventDefault();
    dispatch(boardsActions.deleteBoard(board.id)).then(() => {
      history.push("/boards/current");
    });
  };
  

  if (!board) return null;

  return (
    <div className="whole-container">
      <h1>{board.name}</h1>
      <img src={board.board_cover} alt="board-cover-pic" />
      <p>Secret Board? {board.secret}</p>

      <div className="update-delete-board-btn">
        <span>
          <button
            className="edit-board-btn"
            onClick={() => setModalContent(<EditBoard boardId={boardId} />)}
          >
            Edit
          </button>
        </span>
        <span>
          <button className="edit-user-board-btnn" onClick={deleteBoardClick}>
            DELETE
          </button>
        </span>
      </div>
      <h3>Pin Gallery</h3>
      <p>{board.Pins?.length} pins</p>
      {board.Pins &&
        board.Pins.map((pin) => <PinGalleryCard key={pin.id} pin={pin} />)}
    </div>
  );
}

export default BoardDetails;
