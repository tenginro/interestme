import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { actionClearProfile, getProfile } from "../../store/profile";
import BoardGalleryCard from "../BoardGalleryCard";
import OpenModalMenuItem from "../OpenModalMenuItem";
import FollowGallery from "../FollowGallery";
import CreatePin from "../CreatePin";
import CreateBoard from "../CreateBoard";
import { removeFollowThunk, addFollowThunk } from "../../store/session";
import PinIndexItem from "../AllPins/PinIndexItem";
import { defaultImage } from "../SinglePin";
import EditPin from "../EditPin";
import DeleteModal from "../DeletePinModal";
import OpenModalicon from "../OpenModalicon";

function isFollowed(LogInUser, user) {
  if (!LogInUser.following.filter((f) => f.id === user.id).length) {
    return false;
  } else return true;
  // return Boolean(LogInUser.following.filter((f) => f.id === user.id).length);
}

export default function OtherUserProfile() {
  const { userId } = useParams();
  const LogInUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.profile);
  const [saved, setSaved] = useState(true);
  const [showMenu, setShowMenu] = useState("");
  const [follow, setFollow] = useState(false);

  const LogInUserSavedPins = LogInUser.saved_pins;

  const history = useHistory();
  const dispatch = useDispatch();
  const ulRef = useRef();
  const boards = user?.boards;

  const pins_created = user?.pins;
  const pins_saved = user?.saved_pins;

  console.log(LogInUser.id, +userId);

  useEffect(() => {
    dispatch(getProfile(userId));
    return () => dispatch(actionClearProfile());
  }, [dispatch, userId]);

  if (!user.id)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "20px",
        }}
      >
        <img
          src="https://design.netcorecloud.com/wp-content/uploads/2020/09/infinity-loader.gif"
          alt="loading"
          style={{ width: "800px", height: "400px" }}
        ></img>
        <h2>Loading...</h2>
      </div>
    );

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
        {LogInUser.id !== +userId ? (
          isFollowed(LogInUser, user) ? (
            <button
              className="unfollow_btn"
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(removeFollowThunk(user.id));
                await dispatch(getProfile(userId));
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
                await dispatch(addFollowThunk(user.id));
                await dispatch(getProfile(userId));
                setFollow(true);
              }}
            >
              Follow
            </button>
          )
        ) : null}
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
      <div className="profile-boards-container">
        {!saved && (
          <div>
            <nav className="allPins">
              {pins_created?.map((pin) => (
                <div key={pin.id}>
                  <PinIndexItem
                    key={pin.id}
                    pin={pin}
                    user={LogInUser}
                    page="OtherProfile"
                  />
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
