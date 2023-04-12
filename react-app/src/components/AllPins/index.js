import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionClearPins, getAllPins } from "../../store/pin";
import PinIndexItem from "./PinIndexItem";

function AllPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllPins());
    return () => {
      dispatch(actionClearPins());
    };
  }, [dispatch]);

  if (!pinsObj) return <div>Loading</div>;
  const pins = Object.values(pinsObj);

  return (
    <div>
      <nav>
        {pins.map((pin) => (
          <PinIndexItem pin={pin} key={pin.id} user={user} />
        ))}
      </nav>
    </div>
  );
}

export default AllPins;
