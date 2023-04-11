import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { actionClearPins, getAllPins } from "../../store/pin";
import * as pinsAction from "../../store/pin";

function AllPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  const [board, setBoard] = useState(1);
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

  useEffect(() => {
    dispatch(getAllPins());
    return () => dispatch(actionClearPins());
  }, [dispatch, save]);

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
            {isSaved(pin) ? (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await dispatch(pinsAction.unSavePinThunk(pin, board)).then(
                    () => {
                      if (save === false) setSave(true);
                      else setSave(false);
                    }
                  );
                }}
              >
                Unsave
              </button>
            ) : (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await dispatch(pinsAction.savePinThunk(pin, board)).then(
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
        ))}
      </nav>
    </div>
  );
}

export default AllPins;
