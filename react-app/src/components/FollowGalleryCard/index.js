// Necessary imports
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { addFollowThunk, removeFollowThunk } from "../../store/session";
import "./FollowGalleryCard.css";

function FollowGalleryCard({ follow, flag, reload, variable }) {
  // Create a reference to the current user
  const user = useSelector((state) => state.session.user);
  const [followOrNot, setFollowOrNot] = useState(false);

  // Create dispatch method
  const dispatch = useDispatch();

  useEffect(() => {
    checkFollow();
  }, [dispatch, followOrNot]);

  const checkFollow = () => {
    if (user?.following) {
      const following = user.following;
      following.forEach((f) => {
        if (f.id === follow.id) setFollowOrNot(true);
      });
    }
    return followOrNot;
  };

  // Consume modal for desired function
  const { closeModal } = useModal();

  // onClick function
  const onClick = () => {
    closeModal();
  };

  // follow function
  const dispatchFollow = (id) => {
    dispatch(addFollowThunk(id));
    reload(!variable);
  };

  // unfollow function
  const dispatchUnfollow = (id) => {
    dispatch(removeFollowThunk(id));
    reload(!variable);
    closeModal();
  };

  return (
    <div className="follow-card-container">
      <NavLink
        exact
        to={follow.id === user.id ? `/user` : `/users/${follow.id}`}
        onClick={onClick}
      >
        <div
          className="follow-image-container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "10px",
          }}
        >
          <img
            style={{ height: "50px", width: "50px", borderRadius: "45px" }}
            src={
              follow.profile_pic ||
              "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
            }
            alt=""
          />
          <div className="follow-card-content-container">{follow.username}</div>
        </div>
      </NavLink>
      {follow.id !== user.id ? (
        <div className="follow-card-follow-button-container">
          {!followOrNot ? (
            <button
              onClick={async () => {
                await dispatchFollow(follow.id);
                setFollowOrNot(true);
              }}
              className="follow-button"
            >
              Follow
            </button>
          ) : (
            <button
              onClick={async () => {
                await dispatchUnfollow(follow.id);
                setFollowOrNot(false);
              }}
              className="unfollow-button"
            >
              Unfollow
            </button>
          )}
        </div>
      ) : (
        <div>
          <button className="you-button">You</button>
        </div>
      )}
    </div>
  );
}

export default FollowGalleryCard;
