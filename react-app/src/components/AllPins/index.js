import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionClearPins, getAllPins, getSavedPins } from "../../store/pin";
import PinIndexItem from "./PinIndexItem";
import { getUserBoards } from "../../store/board";

import "./AllPins.css";
import NotFound from "../NotFound";

function AllPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;
  // const logInUserPins = user.pins;

  useEffect(() => {
    dispatch(getAllPins());
    dispatch(getUserBoards());
    dispatch(getSavedPins(userId));
    return () => {
      dispatch(actionClearPins());
    };
  }, [dispatch, userId]);

  const pins = Object.values(pinsObj);

  if (!pinsObj) return <NotFound />;

  return (
    <div>
      <div className="allPins">
        {pins.map((pin) => (
          <div key={pin.id}>
            <PinIndexItem pin={pin} key={pin.id} user={user} page="AllPins" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPins;
