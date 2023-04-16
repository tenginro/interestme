import React, { useEffect } from "react";
import "./AllPins.css";
import { useDispatch, useSelector } from "react-redux";
import { actionClearPins, getAllPins } from "../../store/pin";
import PinIndexItem from "./PinIndexItem";
import { getUserBoards } from "../../store/board";

function AllPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  const user = useSelector((state) => state.session.user);
  const logInUserPins = user.pins;
  console.log('login user pins', user.pins)

  useEffect(() => {
    dispatch(getAllPins());
    dispatch(getUserBoards());
    return () => {
      dispatch(actionClearPins());
    };
  }, [dispatch]);

  if (!pinsObj) return <div>Loading</div>;
  const pins = Object.values(pinsObj);

  return (
    <div>
      <nav className="allPins">
        {pins.map((pin) => (
          <div key={pin.id}>
            <PinIndexItem pin={pin} key={pin.id} user={user} page="AllPins" />
          </div>
        ))}
      </nav>
    </div>
  );
}

export default AllPins;
