import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserPins } from "../../store/pin";

function CurrentPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  console.log("currentpins function");
  console.log("pinObj", pinsObj);

  useEffect(() => {
    console.log("before dispatch");
    dispatch(getUserPins());
    console.log("after dispatch");
  }, [dispatch]);

  if (!pinsObj) return null;
  const pins = Object.values(pinsObj);

  return (
    <div>
      <nav>
        {pins.map((pin) => (
          <div>
            <NavLink key={pin.id} to={`/pins/${pin.id}`}>
              <img src={pin.url} alt={pin.name} />
            </NavLink>
            <button>Save</button>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default CurrentPins;
