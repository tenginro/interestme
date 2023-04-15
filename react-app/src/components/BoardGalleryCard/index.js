// Necessary imports
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBoardDetail } from "../../store/board";
import "./BoardGalleryCard.css";

function BoardGalleryCard({ board }) {
  // Create dispatch method
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardDetail(board.id));
  }, [dispatch, board.id]);

  return (
    <li>
      <div className="board-card-container">
        <NavLink exact to={`/boards/${board.id}`}>
          <div className="board-image-container">
            {board.board_cover ? (
              <img
                style={{ height: "160px", width: "250px" }}
                src={board.board_cover}
                alt="boardDefaultCover"
              />
            ) : (
              <img
                style={{ height: "160px", width: "250px" }}
                src={"https://i.stack.imgur.com/34AD2.jpg"}
                alt="boardDefaultCover"
              />
            )}
          </div>
          <div className="board-card-content-container">
            <h2 className="item">{board.name}</h2>
            {board.Pins && (
              <p className="item">
                {board.Pins?.length}
                {board.Pins?.length <= 1 ? " pin" : " pins"}
              </p>
            )}
          </div>
        </NavLink>
      </div>
    </li>
  );
}

export default BoardGalleryCard;
