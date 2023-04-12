import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as pinsAction from "../../store/pin";

const whichBoard = (pin, userId) => {
  let board_info = [0, "Profile"];
  if (pin?.boards) {
    let the_board;
    pin?.boards.forEach((b) => {
      if (b.user_id === userId) the_board = b;
    });

    if (the_board) {
      board_info = [the_board.id, the_board.name];
    }
  }
  return board_info[0];
};

const isSaved = (pin, userId) => {
  let saveOrNot = false;
  if (pin?.user_saved !== undefined) {
    pin?.user_saved.forEach((s) => {
      if (s.id === userId) {
        saveOrNot = true;
      }
    });
  }
  return saveOrNot;
};

const PinIndexItem = ({ pin, user }) => {
  const dispatch = useDispatch();
  const [board, setBoard] = useState(whichBoard(pin, user?.id));
  const [save, setSave] = useState(isSaved(pin, user?.id));

  const userBoards = user?.boards || [];

  let changingBoardId = board;
  const changeBoard = (id) => {
    changingBoardId = id;
    setBoard(id);
  };

  return (
    <div key={pin.id}>
      <NavLink to={`/pins/${pin.id}`}>
        <img src={pin.url} alt={pin.name} />
      </NavLink>
      <select
        onChange={(e) => {
          changeBoard(Number(e.target.value));
        }}
        value={changingBoardId}
        name="board"
        placeholder="Choose a board"
      >
        <option value="0">Profile</option>
        {userBoards.length > 0 &&
          userBoards.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </select>
      {save ? (
        <button
          onClick={async (e) => {
            e.preventDefault();
            changeBoard(0);
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
          onClick={async (e) => {
            e.preventDefault();
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
  );
};

export default PinIndexItem;
