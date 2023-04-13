// Necessary imports
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBoardDetail } from "../../store/board";
import "./BoardGalleryCard.css";
import { useState } from "react";

function BoardGalleryCard({ board }) {
  // Create dispatch method
  const dispatch = useDispatch();
  const this_board = useSelector((state) => state.boards.singleBoard);
  // Create history method
  const history = useHistory();

  const pins = board.Pins?.length;

  // onClick function
  const onClick = () => {
    dispatch(getBoardDetail(board.id));
  };

  useEffect(() => {
    dispatch(getBoardDetail(board.id));
  }, [dispatch]);

  return (
    <li>
      <div className="board-card-container">
        <NavLink exact to={`/boards/${board.id}`}>
          <div className="board-image-container">
            <img
              style={{ height: "160px", width: "250px" }}
              src={board.board_cover}
              alt="boardDefaultCover"
            />
          </div>
          <div className="board-card-content-container">
            <h2 className="item">{board.name}</h2>
            {this_board.Pins?.length && (
              <p className="item">
                {this_board.Pins?.length}
                {this_board.Pins?.length === 1 ? " pin" : " pins"}
              </p>
            )}
          </div>
        </NavLink>
      </div>
    </li>
  );
}

export default BoardGalleryCard;
