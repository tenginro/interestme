import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { actionClearPins, getAllPins } from "../../store/pin";
import * as pinsAction from "../../store/pin";

function AllPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  const [board, setBoard] = useState(0);
  const [save, setSave] = useState(false);
  const user = useSelector((state) => state.session.user);

  const userSaved = pinsObj.user_saved;
  const userBoards = user?.boards || [];

  const isSaved = (pin) => {
    let saveOrNot = false;
    if (pin?.user_saved !== undefined) {
      pin?.user_saved.forEach((s) => {
        if (s.id === user.id) {
          saveOrNot = true;
        }
      });
    }
    return saveOrNot;
  };

  const whichBoard = (pin) => {
    let board_info = [0, "Profile"];
    if (pin?.boards) {
      let the_board = pin.boards[0];
      if (the_board) board_info = [the_board.id, the_board.name];
    }
    return board_info;
  };

  let board_ID;
  const changeBoard = (id) => {
    board_ID = id;
    return board_ID;
  };

  let settedBoardId;
  const settingBoard = (id) => {
    settedBoardId = id;
    return settedBoardId;
  };

  useEffect(() => {
    dispatch(getAllPins());
    return () => dispatch(actionClearPins());
  }, [dispatch, save, settedBoardId]);

  useEffect(() => {
    if (userBoards.length > 0) {
      setBoard(userBoards[0].id);
    } else {
      setBoard(0);
    }
  }, [userBoards]);

  if (!pinsObj) return null;
  const pins = Object.values(pinsObj);

  return (
    <div>
      <nav>
        {pins.map((pin) => (
          <div key={pin.id}>
            <NavLink to={`/pins/${pin.id}`}>
              <img src={pin.url} alt={pin.name} />
            </NavLink>
            <select
              onChange={(e) => {
                changeBoard(Number(e.target.value));
                console.log(board_ID);
              }}
              value={board_ID || whichBoard(pin)[0]}
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
            {isSaved(pin) ? (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  settingBoard(0);
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
                  settingBoard(board_ID);
                  await dispatch(
                    pinsAction.savePinThunk(pin, settedBoardId)
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
        ))}
      </nav>
    </div>
  );
}

export default AllPins;
