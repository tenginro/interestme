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
              Tinterest
            </div>
          </NavLink>
        )}
        {sessionUser === null && (
          <NavLink exact to="/">
            <div className="logoLine">
              <img className="logo" src={logo} alt="logo" />
              Tinterest
            </div>
          </NavLink>
        )}
      </li>
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
      <div>
        {sessionUser ? (
          <button onClick={clickCreate}>
            <NavLink exact to="/pins/new">
              {" "}
              Create{" "}
            </NavLink>
          </button>
        ) : null}
      </div>
      {isLoaded && (
        <li className="profile li">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
