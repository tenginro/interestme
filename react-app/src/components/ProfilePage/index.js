// Necessary imports
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import BoardGalleryCard from "../BoardGalleryCard";
import OpenModalMenuItem from "../OpenModalMenuItem";
import FollowGallery from "../FollowGallery";
import "./ProfilePage.css";
import CurrentPins from "../ManagePins";
import PinGalleryCard from "../PinGalleryCard";
import OpenModalicon from "../OpenModalicon";
import CreateBoard from "../CreateBoard";
import CreatePin from "../CreatePin";

function ProfilePage() {
  // Create a reference to the session user
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  console.log("currentUser: ", user);
  const ulRef = useRef();
  const boards = user?.boards;

  const pins_saved = user?.saved_pins;

  const [saved, setSaved] = useState(true);
  const [showMenu, setShowMenu] = useState("");

  // let boards = created ? user.pins : user.saved_pins
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  if (!user) return null;

  return (
    <div className="profile-page-container">
      <div className="profile-picture-container">
        <img
          style={{ height: "150px", width: "150px", borderRadius: "45px" }}
          src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
          alt=""
        />
      </div>
      <div className="username-container">
        <h2>{user.username}</h2>
      </div>
      <ul className="followers-container">
        <OpenModalMenuItem
          itemText={`${user.following.length} following`}
          modalComponent={<FollowGallery follows={user.following} />}
        />
        <OpenModalMenuItem
          itemText={`${user.followers.length} followers`}
          modalComponent={
            <FollowGallery follows={user.followers} flag={true} />
          }
        />
      </ul>
      <div className="created-saved-container">
        <button
          className={!saved ? "activated" : ""}
          onClick={() => setSaved(false)}
        >
          Created
        </button>
        <button
          className={saved ? "activated" : ""}
          onClick={() => setSaved(true)}
        >
          Saved
        </button>
      </div>
      <div className="plus-sign-container">
        <div className="icons">
          <i
            style={{ cursor: "pointer" }}
            onClick={() => alert("feature coming soon")}
            className="fa-solid fa-sliders"
          />
        </div>
        <div className="icons" onClick={openMenu}>
          <button className={showMenu ? "active pointer" : "pointer"}>
            <i
              className="fa-solid fa-plus"
              onClick={() => setShowMenu(true)}
            ></i>
          </button>
          {showMenu && (
            <>
              <p className="dropdown-header">Create</p>
            </>
          )}
          <ul className={showMenu ? "dropdown-menu" : "hidden"} ref={ulRef}>
            <OpenModalMenuItem
              itemText="Pin"
              onItemClick={closeMenu}
              modalComponent={<CreatePin />}
            />
            <OpenModalMenuItem
              itemText="Board"
              onItemClick={closeMenu}
              modalComponent={<CreateBoard />}
            />
          </ul>
          {/* <button className="profileDownButton" onClick={openMenu}>
            <i className="fa-solid fa-plus"></i>
          </button> */}
          {/* <OpenModalicon
            iconType="create a board"
            modalComponent={<CreateBoard />}
          /> */}
          {/* <i
            style={{ cursor: "pointer" }}
            onClick={() => alert("click")}
            className="fa-solid fa-plus"
          /> */}
        </div>
      </div>
      <div className="profile-boards-container">
        {!saved && <CurrentPins />}
        {saved && (
          <div>
            <ul className="board-gallery-list">
              {boards.map((board) => (
                <BoardGalleryCard key={board.id} board={board} />
              ))}
            </ul>
            <ul className="saved_pins-gallery-list">
              <div>All pins saved</div>
              {pins_saved.map((pin) => (
                <PinGalleryCard key={pin.id} pin={pin} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
