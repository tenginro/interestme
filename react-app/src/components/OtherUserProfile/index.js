import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "../../store/profile";
import BoardGalleryCard from "../BoardGalleryCard";
import OpenModalMenuItem from "../OpenModalMenuItem";
import FollowGallery from "../FollowGallery";
import CurrentPins from "../ManagePins";
import PinGalleryCard from "../PinGalleryCard";
import CreatePin from "../CreatePin";
import CreateBoard from "../CreateBoard";

export default function OtherUserProfile() {
  const { userId } = useParams();
  const LogInUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.profile);
  const [saved, setSaved] = useState(true);
  const [showMenu, setShowMenu] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const ulRef = useRef();
  const boards = user?.boards;

  const pins_saved = user?.saved_pins;
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [dispatch, userId]);

  if (!user.username) return <div>Loading</div>;
  if (user.id === LogInUser) return history.push(`/user`);

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
