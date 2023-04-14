import React, { useEffect } from "react";
import './AllPins.css'
import { useDispatch, useSelector } from "react-redux";
import { actionClearPins, getAllPins, getSavedPins } from "../../store/pin";
import PinIndexItem from "./PinIndexItem";
import {
  actionClearBoard,
  actionClearBoards,
  getUserBoards,
} from "../../store/board";
function AllPins() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins.allPins);
  const user = useSelector((state) => state.session.user);
  
  useEffect(() => {
    dispatch(getAllPins());
    dispatch(getUserBoards());
    dispatch(getSavedPins(user.id));
    return () => {
      dispatch(actionClearPins());
      
      // dispatch(actionClearBoards());
      // dispatch(actionClearBoard());
    };
  }, [dispatch, user.id]);

  if (!pinsObj) return <div>Loading</div>;
  const pins = Object.values(pinsObj);

  return (
    <div >
      <nav className="allPins">
        {pins.map((pin) => (
          <PinIndexItem pin={pin} key={pin.id} user={user} page="AllPins"/>
        ))}
      </nav>
    </div>
  );
}

export default AllPins;
