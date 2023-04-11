import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { actionClearPins, getAllPins } from "../../store/pin";
import * as pinsAction from "../../store/pin";

function AllPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  const boardObj = useSelector((state) => state.boards.allBoards);
  const [board, setBoard] = useState("profile");
  const [save, setSave] = useState(false);

  useEffect(() => {
    dispatch(getAllPins());
    // return () => dispatch(actionClearPins());
  }, [dispatch]);

  if (!pinsObj) return null;
  const pins = Object.values(pinsObj);

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
                setBoard(e.target.value);
              }}
              value={board}
              name="board"
              placeholder="Choose a board"
            >
              <option value="Profile">Profile</option>
              {/* {boards.map((c) => (
                <option value={c}>{c}</option>
              ))} */}
            </select>
            {save ? (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const SaveRes = await dispatch(
                    pinsAction.unSavePinThunk(pin, board)
                  );
                }}
              >
                Saved
              </button>
            ) : (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const SaveRes = await dispatch(
                    pinsAction.savePinThunk(pin, board)
                  );
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
