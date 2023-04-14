import React, { useState } from "react";
import "./AllPins.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as pinsAction from "../../store/pin";

export const whichBoard = (pin, user, thisBoardId, thisBoardName) => {
  let board_info = [0, "Profile"];
  if (thisBoardId && thisBoardName) board_info = [thisBoardId, thisBoardName];
  else if (user?.boards) {
    let the_board;
    user?.boards.forEach((b) => {
      b?.Pins.forEach((p) => {
        if (p.id === pin.id) the_board = b;
      });
    });

    if (the_board) {
      board_info = [the_board.id, the_board.name];
    }
  }
  return board_info[0];
};

export const isSaved = (pin, user, inThisBoard) => {
  let saveOrNot = false;
  if (inThisBoard) saveOrNot = true;
  else if (pin?.user_saved !== undefined) {
    pin?.user_saved.forEach((s) => {
      if (s.id === user.id) {
        saveOrNot = true;
      }
    });
  }
  return saveOrNot;
};

const PinIndexItem = ({
  pin,
  user,
  inThisBoard,
  thisBoardId,
  thisBoardName,
  page,
}) => {
  const dispatch = useDispatch();
  const boardsObj = useSelector((state) => state.boards.userBoards);
  const boards = Object.values(boardsObj);
  const savedBoardId = pin?.boards?.filter((b) => b.user_id === user?.id)[0]
    ?.id;
  const savedBoardName = pin?.boards?.filter((b) => b.user_id === user?.id)[0]
    ?.name;
  const [save, setSave] = useState(isSaved(pin, user, inThisBoard));
  const [board, setBoard] = useState(
    whichBoard(pin, user, thisBoardId, thisBoardName)
  );
  const history = useHistory();

  const userBoards = user?.boards || [];

  let changingBoardId = board;
  const changeBoard = (id) => {
    changingBoardId = id;
    setBoard(id);
  };

  if (!user.id || !pin.id) return <div>Loading</div>;

  return (
    <div key={pin.id} className="pinIndexItem">
      {/* <Link to={{
            pathname:`/pins/${pin.id}`, state:{thisBoardId:changingBoardId, thisBoardName:thisBoardName}}}>
  
        <img src={pin.url} alt={pin.name} className="pinImg" />
      </Link> */}
      <Link to={`/pins/${pin.id}`}>
        <img src={pin.url} alt={pin.name} className="pinImg" />
      </Link>
      <div className="boardNSave">
        <select
          className="boardOption"
          onSubmit={(e) => {
            setBoard(Number(e.target.value));
          }}
          onChange={(e) => {
            changeBoard(Number(e.target.value));
          }}
          value={savedBoardId || changingBoardId}
          name="board"
          placeholder="Choose a board"
        >
          <option value="0" className="option">
            Profile
          </option>
          {boards.length > 0 &&
            boards.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        {save || page === "ProfilePage" ? (
          <button
            className="saveButton"
            onClick={async (e) => {
              e.preventDefault();
              changeBoard(0);
              await dispatch(pinsAction.unSavePinThunk(pin))
                .then(() => {
                  if (save === false) setSave(true);
                  else setSave(false);
                })
                .then(() => {
                  if (page === "AllPins") history.push(`/pins`);
                  if (page === "BoardDetail") window.location.reload();
                  if (page === "ProfilePage") window.location.reload();
                });
            }}
          >
            Unsave
          </button>
        ) : (
          <button
            className="saveButton"
            onClick={async (e) => {
              e.preventDefault();
              changeBoard(changingBoardId);
              await dispatch(
                pinsAction.savePinThunk(pin, changingBoardId)
              ).then(() => {
                if (save === false) setSave(true);
                else setSave(false);
              });
            }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default PinIndexItem;
