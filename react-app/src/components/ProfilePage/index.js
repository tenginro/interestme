// Necessary imports
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardGalleryCard from "../BoardGalleryCard";
import OpenModalMenuItem from "../OpenModalMenuItem";
import FollowGallery from "../FollowGallery";
import "./ProfilePage.css";
import CurrentPins from "../ManagePins";
import CreateBoard from "../CreateBoard";
import CreatePin from "../CreatePin";
import {
  actionClearBoard,
  actionClearBoards,
  getUserBoards,
} from "../../store/board";
import { actionClearSavedPins, getSavedPins } from "../../store/pin";
import PinIndexItem from "../AllPins/PinIndexItem";
import { defaultImage } from "../SinglePin";

function ProfilePage() {
  // Create a reference to the session user
  const user = useSelector((state) => state.session.user);
  const ulRef = useRef();

  const boardsObj = useSelector((state) => state.boards.userBoards);
  const boards = Object.values(boardsObj);

  const savedPinsObj = useSelector((state) => state.pins.savedPins);
  // console.log("savedPinsObj", savedPinsObj);
  // const savedPinsArr = user.saved_pins;
  let savedPinsArr = [];
  if (savedPinsObj !== null && savedPinsObj !== undefined) {
    savedPinsArr = Object.values(savedPinsObj);
    // console.log("savedPinsArr", savedPinsArr);
  }

  const [saved, setSaved] = useState(true);
  const [showMenu, setShowMenu] = useState("");

  // let boards = created ? user.pins : user.saved_pins
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = () => setShowMenu(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedPins(user.id));
    dispatch(getUserBoards(user.id));
    // return () => {
    //   dispatch(actionClearBoards());
    //   dispatch(actionClearBoard());
    //   dispatch(actionClearSavedPins());
    // };
  }, [dispatch, user.id]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  if (!user) return <div>Loading</div>;

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
      <div className="subtitle-container">
        <div className="followers-container">
          <div style={{ cursor: "pointer" }}>
            <OpenModalMenuItem
              itemText={`${user.following.length} following`}
              modalComponent={<FollowGallery follows={user.following} />}
            />
          </div>
          <div style={{ cursor: "pointer" }}>
            <OpenModalMenuItem
              itemText={`${user.followers.length} followers`}
              modalComponent={
                <FollowGallery follows={user.followers} flag={true} />
              }
            />
          </div>
        </div>
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
      </div>
      <div className="plus-sign-container">
        <div className="icons">
          <i
            style={{ cursor: "pointer" }}
            onClick={() => alert("feature coming soon")}
            className="fa-solid fa-sliders"
          />
        </div>
        <div className="plusIcon">
          <i className="fa-solid fa-plus" onClick={openMenu}></i>
          <ul className={showMenu ? "dropdown-menu" : "hidden"} ref={ulRef}>
            <p className="dropdown-header">Create</p>
            <div>
              <OpenModalMenuItem
                itemText="Pin"
                onItemClick={closeMenu}
                modalComponent={<CreatePin />}
              />
            </div>
            <div>
              <OpenModalMenuItem
                itemText="Board"
                onItemClick={closeMenu}
                modalComponent={<CreateBoard />}
              />
            </div>
          </ul>
        </div>
      </div>
      <div className="profile-boards-container">
        {!saved && <CurrentPins />}
        {saved && (
          <div className="boardsAndPins">
            <div className="board-gallery-list">
              {boards.map((board) => (
                <BoardGalleryCard key={board.id} board={board} />
              ))}
            </div>
            <div className="saved_pins-gallery-list">
              <h4>All saved pins</h4>
              <div className="pinsDisplay">
                {savedPinsArr?.map((pin) => (
                  <PinIndexItem
                    key={pin.id}
                    pin={pin}
                    user={user}
                    page="ProfilePage"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
