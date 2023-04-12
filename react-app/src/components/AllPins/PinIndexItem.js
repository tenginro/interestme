import React, { useState } from "react";
import './AllPins.css'
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as pinsAction from "../../store/pin";

export const whichBoard = (pin, user) => {
  let board_info = [0, "Profile"];
  // console.log("user.boards", user.boards);
  if (user?.boards) {
    let the_board;
    user?.boards.forEach((b) => {
      // console.log("b", b);
      b?.Pins.forEach((p) => {
        if (p.id === pin.id) the_board = b;
      });
    });

    if (the_board) {
      board_info = [the_board.id, the_board.name];
    }
  }
  console.log("board_info", board_info);
  return board_info[0];
};

export const isSaved = (pin, user) => {
  let saveOrNot = false;
  // console.log("pin.user_saved", pin.user_saved);
  // console.log("user.id", user.id);
  if (pin?.user_saved !== undefined) {
    pin?.user_saved.forEach((s) => {
      if (s.id === user.id) {
        saveOrNot = true;
      }
    });
  }
  console.log("saveornot", saveOrNot);
  return saveOrNot;
};

const PinIndexItem = ({ pin, user }) => {
  const dispatch = useDispatch();
  const [board, setBoard] = useState(whichBoard(pin, user));
  const [save, setSave] = useState(isSaved(pin, user));

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
        <img src={pin.url} alt={pin.name} className="pinImg"/>
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
          <option value="0" className="option">Profile</option>
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
              console.log('clicked unsave')
              await dispatch(pinsAction.unSavePinThunk(pin)).then(() => {
                if (save === false) setSave(true);
                else setSave(false);
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
              await dispatch(pinsAction.savePinThunk(pin, changingBoardId)).then(
                () => {
                  if (save === false) setSave(true);
                  else setSave(false);
                }
              );
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
