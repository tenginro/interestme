import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../LandingPage/Assets/icon.png";
import ProfileButton from "./ProfileButton";
import OpenModalMenuItem from "../OpenModalMenuItem";
import CreateBoard from "../CreateBoard";
import CreatePin from "../CreatePin";
import "./Navigation.css";

function Navigation({ isLoaded, searchQuery, setSearchQuery }) {
  const ulRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    setSearchQuery("");
  }, []);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClass = "create_drop-down" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const handleCreatePin = () => {
    history.push("/pins/new");
    setShowMenu(false);
  };

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
      {sessionUser && (
        <div className="createPin">
          <button className="create__Button" onClick={openMenu}>
            Create
          </button>
          {setShowMenu ? (
            <ul className={ulClass} ref={ulRef}>
              <div className="create-pin_board-btn">
                <OpenModalMenuItem
                  itemText="Pin"
                  onItemClick={closeMenu}
                  modalComponent={<CreatePin />}
                />
              </div>

              <div className="create-pin_board-btn">
                <OpenModalMenuItem
                  itemText="Board"
                  onItemClick={closeMenu}
                  modalComponent={<CreateBoard />}
                />
              </div>
            </ul>
          ) : null}
        </div>
      )}

      {sessionUser && (
        <div className="searchBar">
          <div>
            <i className="fas fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            type="search"
            className="searchInput"
            placeholder="Search"
            spellCheck={true}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setSearchQuery(e.target.value);
                if (searchQuery.length) {
                  history.push(`/pins/search/${searchQuery}`);
                }
              }
            }}
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
