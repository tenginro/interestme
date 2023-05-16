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

  if (!pins.length)
    return (
      <h2
        className="loadingAllPins"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <div>
          <i className="fas fa-solid fa-spinner fa-5x"></i>
        </div>
        <div>
          <div>We're adding new ideas to your home feed!</div>
          <div style={{ textAlign: "center" }}>
            Please return to{" "}
            <span style={{ textDecoration: "underline" }}>
              <NavLink exact to="/pins">
                HomePage
              </NavLink>
            </span>
            .
          </div>
        </div>
      </h2>
    );

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
