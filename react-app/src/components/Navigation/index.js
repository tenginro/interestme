import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../LandingPage/Assets/icon.png";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const clickCreate = (e) => {
    e.preventDefault();
  };

  return (
    <ul className="nav ul">
      <li className="home li">
        {sessionUser && (
          <NavLink exact to="/pins">
            <div className="logoLine">
              <img className="logo" src={logo} alt="logo" />
              <div className="projectName">Home</div>
            </div>
          </NavLink>
        )}
        {sessionUser === null && (
          <NavLink exact to="/">
            <div className="logoLine">
              <img className="logo" src={logo} alt="logo" />
              <div className="projectName">Home</div>
            </div>
          </NavLink>
        )}
      </li>
      <div className="createPin">
        {sessionUser ? (
          <button className="createPinButton" onClick={clickCreate}>
            <NavLink exact to="/pins/new">
              <div className="createWord">
                Create{"  "}
                <i className="fas fa-solid fa-angle-down"></i>
              </div>
            </NavLink>
          </button>
        ) : null}
      </div>
      {sessionUser && (
        <div className="searchBar">
          <i className="fas fa-solid fa-magnifying-glass"></i>
          <input
            className="searchInput"
            onClick={() => alert("Feature Coming Soon...")}
            placeholder="Search"
          ></input>
        </div>
      )}

      {isLoaded && (
        <li className="profile li">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
