import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  actionClearPins,
  getSavedPins,
  getSearchedPins,
} from "../../store/pin";
import PinIndexItem from "../AllPins/PinIndexItem";
import { getUserBoards } from "../../store/board";
import NotFound from "../NotFound";

export default function SearchPins() {
  const dispatch = useDispatch();
  const { searchInput } = useParams();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const pinsObj = useSelector((state) => state.pins.allPins);
  const pins = Object.values(pinsObj);

  useEffect(() => {
    dispatch(getSearchedPins(searchInput));
    dispatch(getUserBoards());
    dispatch(getSavedPins(userId));
    return () => {
      dispatch(actionClearPins());
    };
  }, [dispatch, userId, searchInput]);

  if (!pins.length) {
    return <NotFound />;
  }

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
