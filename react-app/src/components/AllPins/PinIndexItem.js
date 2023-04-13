import React, { useState } from "react";
import "./AllPins.css";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
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
      <NavLink to={`/pins/${pin.id}`}>
        <img src={pin.url} alt={pin.name} className="pinImg" />
      </NavLink>
      <div className="boardNSave">
        <select
          className="boardOption"
          onChange={(e) => {
            changeBoard(Number(e.target.value));
          }}
          value={changingBoardId}
          name="board"
          placeholder="Choose a board"
        >
          <option value="0" className="option">
            Profile
          </option>
          {userBoards.length > 0 &&
            userBoards.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        {save ? (
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
