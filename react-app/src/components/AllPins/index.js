import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { actionClearPins, getAllPins } from "../../store/pin";
import * as pinsAction from "../../store/pin";

function AllPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  // const boardObj = useSelector((state) => state.boards.allBoards);
  const [board, setBoard] = useState(1);
  const [save, setSave] = useState(false);
  const user = useSelector((state) => state.session.user);

  // console.log("before getting userSaved", pinsObj);
  const userSaved = pinsObj.user_saved;
  const userBoards = user.boards; //array
  // console.log("board from user", userBoards);
  // console.log("insde all pins component", userSaved);

  ///////////////////////////////////////
  const isSaved = () => {
    // console.log("inside isSaved");
    if (userSaved !== undefined) {
      userSaved.forEach((s) => {
        if (s.id === user.id) setSave(true);
      });
    }
  };

  useEffect(() => {
    dispatch(getAllPins());
    isSaved();
    return () => dispatch(actionClearPins());
  }, [dispatch]);

  if (!pinsObj) return null;
  const pins = Object.values(pinsObj);
  // if(!boardObj) return <div>Loading</div>
  // const boards = Object.values(boardObj)

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
                console.log("e.target.value", e.target.value);
                setBoard(e.target.value);
              }}
              value={board}
              name="board"
              placeholder="Choose a board"
            >
              {userBoards.length > 0 ? (
                userBoards.map((c) => <option value={c.id}>{c.name}</option>)
              ) : (
                <option value="Profile">Profile</option>
              )}
            </select>
            {save ? (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  console.log("click to unsave");
                  await dispatch(pinsAction.unSavePinThunk(pin, board));
                  setSave(false);
                }}
              >
                Unsave
              </button>
            ) : (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  console.log("click to save");
                  await dispatch(pinsAction.savePinThunk(pin, board));
                  setSave(true);
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
