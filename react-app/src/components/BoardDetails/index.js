// Necessary imports
import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as boardsActions from "../../store/board";
import * as pinsActions from "../../store/pin";
import DropdownMenuButton from "../DropdownMenuButton";
import PinIndexItem from "../AllPins/PinIndexItem";
import "./BoardDetails.css";
import Loading from "../Loading";

function BoardDetails() {
  // Extract parameter variables from parameter object
  const { boardId } = useParams();

  // Create dispatch method
  const dispatch = useDispatch();

  // Create history method
  const history = useHistory();

  // Subscribe to single board slice of state
  const board = useSelector((state) => state.boards.singleBoard);
  const pins = useSelector((state) => state.pins.allPins);
  // Subscribe to user session slice of state
  const currentUser = useSelector((state) => state.session.user);

  const pinLength = board.Pins?.length;
  // Upon component render, dispatch the action to load the single board into the redux store for retrieval
  // let board
  useEffect(() => {
    dispatch(boardsActions.getBoardDetail(boardId));
    dispatch(boardsActions.getUserBoards());
    dispatch(pinsActions.getRandomPins());

    return () => {
      dispatch(boardsActions.actionClearBoard());
      dispatch(pinsActions.actionClearPins());
    };
  }, [dispatch, boardId]);

  const deleteBoardClick = (e) => {
    e.preventDefault();
    dispatch(boardsActions.deleteBoard(board.id)).then(() => {
      history.push("/boards/current");
    });
  };
  let pinsArr;
  if (pins) {
    pinsArr = Object.values(pins);
  }

  if (!board || !pins) return <Loading />;

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
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginRight: "0.5em",
            }}
          />
          <p style={{ fontSize: "14px" }}>{board.User?.username}</p>
        </div>

        {board.description && (
          <div className="boardDescription">
            {board.description && !board.secret ? board.description : ""}
          </div>
        )}
        <p className="secret">
          {board.secret ? "Secret Board! Shhh!" : "Public Board"}
        </p>
      </div>
      <div 
      style={{display:'flex',
              justifyContent:"space-between",
              alignItems:"center",
              marginLeft: '100px',
              width:'300px'
            }}>
        <i style={{cursor:"pointer"}}
        onClick={(e)=>{
          e.preventDefault();
          history.push("/user");
        }}
        className="fa-solid fa-arrow-left"></i>
        <h2 className="pinsCountNumber"
        style={{width:"100%"}}
        >
          {board.Pins?.length > 0 ? board.Pins?.length : ""}{" "}
          {board.Pins?.length === 0
            ? ("")
            : (board.Pins?.length < 2)
            ? (" pin")
            : (" pins")}
        </h2>
      </div>
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
      <div className="board-detail-more-like-this-container">
        <h4>Find some ideas for this board</h4>
        <div className="randomPinsDisplay">
          {pinsArr?.map((pin) => (
            <Link to={`/pins/${pin.id}`}>
              <img
                src={pin.url}
                alt="pinImages"
                className="singleBoardPinIdeaImage"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardDetails;
