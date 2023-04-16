import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { actionClearProfile, getProfile } from "../../store/profile";
import BoardGalleryCard from "../BoardGalleryCard";
import OpenModalMenuItem from "../OpenModalMenuItem";
import FollowGallery from "../FollowGallery";
import CreatePin from "../CreatePin";
import CreateBoard from "../CreateBoard";
import { removeFollowThunk } from "../../store/session";
import PinIndexItem from "../AllPins/PinIndexItem";
import { defaultImage } from "../SinglePin";

export default function OtherUserProfile() {
  const { userId } = useParams();
  const LogInUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.profile);
  const [saved, setSaved] = useState(true);
  const [showMenu, setShowMenu] = useState("");
  const [follow, setFollow] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const ulRef = useRef();
  const boards = user?.boards;

  const pins_created = user?.pins;
  const pins_saved = user?.saved_pins;
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = () => setShowMenu(false);

  function checkFollow() {
    if (LogInUser?.following) {
      const following = LogInUser.following;
      following.forEach((f) => {
        if (f.id === user?.id) {
          setFollow(true);
        }
      });
    }
    return follow;
  }

  useEffect(() => {
    dispatch(getProfile(userId));
    checkFollow();

    return () => dispatch(actionClearProfile());
  }, [dispatch, userId, follow]);

  if (!user.username) return <div>Loading</div>;

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
        {LogInUser.following.filter((f) => f.id === user.id).length ? (
          <button
            className="unfollow_btn"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(removeFollowThunk(user.id));
              setFollow(false);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="follow_btn"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(removeFollowThunk(user.id));
              setFollow(true);
            }}
          >
            Follow
          </button>
        )}
      </div>
      <div className="subtitle-container">
        <div className="followers-container">
          <div className="toAddCursor">
            <OpenModalMenuItem
              itemText={`${user.following.length} following`}
              modalComponent={
                <FollowGallery profile={user} follows={user.following} />
              }
            />
          </div>
          <div className="toAddCursor">
            <OpenModalMenuItem
              itemText={`${user.followers.length} followers`}
              modalComponent={
                <FollowGallery
                  profile={user}
                  follows={user.followers}
                  flag={true}
                />
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
      {user.id === LogInUser.id && (
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
      )}
      <div className="profile-boards-container">
        {!saved && (
          <div>
            <nav className="allPins">
              {pins_created?.map((pin) => (
                <div key={pin.id} className="pinIndexItem">
                  <NavLink key={pin.id} to={`/pins/${pin.id}`}>
                    <img
                      className="pinImg"
                      src={pin.url}
                      alt={pin.name}
                      onError={defaultImage}
                    />
                  </NavLink>
                </div>
              ))}
            </nav>
          </div>
        )}
        {saved && (
          <div className="boardsAndPins">
            <div className="board-gallery-list">
              {boards.map(
                (board) =>
                  !board.secret && (
                    <BoardGalleryCard key={board.id} board={board} />
                  )
              )}
            </div>
            <div className="saved_pins-gallery-list">
              <h4>All saved pins</h4>
              <div className="pinsDisplay">
                {pins_saved.map((pin) => (
                  <PinIndexItem key={pin.id} pin={pin} user={LogInUser} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
