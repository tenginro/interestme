// Necessary imports
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as boardsActions from "../../store/board";
import DropdownMenuButton from "../DropdownMenuButton";
import PinIndexItem from "../AllPins/PinIndexItem";
import "./BoardDetails.css";

function BoardDetails() {
  // Extract parameter variables from parameter object
  const { boardId } = useParams();

  // Create dispatch method
  const dispatch = useDispatch();

  // Create history method
  const history = useHistory();

  // Subscribe to single board slice of state
  const board = useSelector((state) => state.boards.singleBoard);

  // Subscribe to user session slice of state
  const currentUser = useSelector((state) => state.session.user);

  const pinLength = board.Pins?.length;
  // Upon component render, dispatch the action to load the single board into the redux store for retrieval
  // let board
  useEffect(() => {
    dispatch(boardsActions.getBoardDetail(boardId));
    dispatch(boardsActions.getUserBoards());
    return () => dispatch(boardsActions.actionClearBoard());
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
      <div className="info-container">
        <div className="board-detail-name-container">
          <h1>{board.name}</h1>
          {board.user_id === currentUser.id && (
            <div>
              <DropdownMenuButton board={board} />
            </div>
          )}
        </div>
        <div className="manage-board-buttons-container"></div>
        <div className="allPinUserInfo">
            <img
              src={board.User?.profile_pic}
              alt={board.User?.username}
              style={{width:"50px", height: "50px", borderRadius:"50%", marginRight:"0.5em"}}
            />
            <p style={{ fontSize: "14px" }}>{board.User?.username}</p>
          </div>
        {/* <div className="board-cover-container">
          {board.board_cover ? (
            <img src={board.board_cover} alt="board-cover-pic" />
          ) : (
            <img
              src={
                "https://as2.ftcdn.net/v2/jpg/03/64/76/97/1000_F_364769719_nOVnv8n06e2l2YS3u7NCwzcySTjD0YOe.jpg"
              }
              alt="board-cover-pic"
            />
          )}
        </div> */}
        {board.description && (
          <div className="boardDescription">
            {board.description && !board.secret ? board.description : ""}
          </div>
        )}
        <p className="secret">
          {board.secret ? "Secret Board! Shhh!" : "Public Board"}
        </p>
      </div>

      <h2 className="pinsCountNumber">
        {board.Pins?.length > 0 ? board.Pins?.length : ""}{" "}
        {board.Pins?.length == 0
          ? ""
          : board.Pins?.length < 2
          ? " pin"
          : " pins"}
      </h2>
      <div className="pin-gallery-grid">
        {board.Pins?.map((pin) => (
          <PinIndexItem
            key={pin.id}
            pin={pin}
            user={currentUser}
            inThisBoard={true}
            thisBoardId={board.id}
            thisBoardName={board.name}
            page="BoardDetail"
          />
        ))}
      </div>
    </div>
  );
}

export default BoardDetails;
