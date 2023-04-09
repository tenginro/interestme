import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav ul">
      <li className="home li">
        <NavLink exact to="/pins">
          <div className="logoLine">
            <img className="logo" src={require("./icon.png")} alt="logo"></img>
            Tinterest
          </div>
        </NavLink>
      </li>
      {isLoaded && (
        <li className="profile li">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
