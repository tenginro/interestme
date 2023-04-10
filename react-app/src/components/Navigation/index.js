import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const clickCreate = (e) => {
		e.preventDefault();
	}

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
	  <div>
				{sessionUser ? 
				(
					<button onClick={clickCreate}>
						<NavLink exact to='/pins/new'> Create </NavLink>
					</button>
				) : (null)}
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
