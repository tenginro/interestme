import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  actionClearPins,
  getAllPins,
  getSavedPins,
  getSearchedPins,
} from "../../store/pin";
import PinIndexItem from "../AllPins/PinIndexItem";
import { getUserBoards } from "../../store/board";
import NotFound from "../NotFound";

export default function SearchPins() {
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  const pinsObj = useSelector((state) => state.pins.allPins);
  const user = useSelector((state) => state.session.user);
  const userId = user.id;

  useEffect(() => {
    dispatch(getSearchedPins(searchQuery));
    dispatch(getUserBoards());
    dispatch(getSavedPins(userId));
    return () => {
      dispatch(actionClearPins());
    };
  }, [dispatch, userId, searchQuery]);

  const pins = Object.values(pinsObj);

  if (!pins.length) return <NotFound />;

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
