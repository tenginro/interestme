import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { actionClearPins, getUserPins } from "../../store/pin";
import "./ManagePins.css";
import OpenModalicon from "../OpenModalicon";
import EditPin from "../EditPin";
import { defaultImage } from "../SinglePin";
import DeleteModal from "../DeletePinModal";
import PinIndexItem from "../AllPins/PinIndexItem";

function CurrentPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserPins());
    return () => dispatch(actionClearPins());
  }, [dispatch]);

  if (!pinsObj) return null;
  const pins = Object.values(pinsObj);

  return (
    <div>
      <nav className="currentPins">
        {pins.map((pin) => (
          <div key={pin.id}>
            <PinIndexItem
              pin={pin}
              key={pin.id}
              user={user}
              page="AllPins"
            />
          </div>
        ))}
      </nav>
    </div>
  );
}

export default CurrentPins;
