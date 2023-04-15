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
  // const this_board = useSelector((state) => state.boards.singleBoard);
  // Create history method
  const history = useHistory();

  const pins = board.Pins?.length;

  // onClick function
  // const onClick = () => {
  //   dispatch(getBoardDetail(board.id));
  // };

  useEffect(() => {
    dispatch(getBoardDetail(board.id));
  }, [dispatch]);

  return (
    <li>
      <div className="board-card-container">
        <NavLink exact to={`/boards/${board.id}`}>
          <div className="board-image-container">
            {board.board_cover ? (
              <img
                style={{ height: "160px", width: "250px", objectFit: "cover" }}
                src={board.board_cover}
                alt="boardDefaultCover"
              />
            ) : (
              <img
                style={{ height: "160px", width: "250px", objectFit: "cover" }}
                src={
                  "https://as2.ftcdn.net/v2/jpg/03/64/76/97/1000_F_364769719_nOVnv8n06e2l2YS3u7NCwzcySTjD0YOe.jpg"
                }
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
