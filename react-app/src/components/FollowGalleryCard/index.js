// Necessary imports
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { addFollowThunk, removeFollowThunk } from "../../store/session";
import { authenticate } from "../../store/session";
import "./FollowGalleryCard.css";

function FollowGalleryCard({ follow, flag, reload, variable }) {
  // Create a reference to the current user
  const user = useSelector((state) => state.session.user);
  const [followOrNot, setFollowOrNot] = useState(false);

  // Create dispatch method
  const dispatch = useDispatch();

  useEffect(() => {
    checkFollow();
    console.log("followOrNot in useEffect", followOrNot);
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

  console.log("flag: ", flag);

  // Consume modal for desired function
  const { closeModal } = useModal();

  // onClick function
  const onClick = () => {
    closeModal();
  };

  // follow function
  const dispatchFollow = (id) => {
    console.log("follow feature");
    dispatch(addFollowThunk(id));
    reload(!variable);
    console.log("after dispatch");
  };

  // unfollow function
  const dispatchUnfollow = (id) => {
    console.log("unfollow feature");
    dispatch(removeFollowThunk(user, id));
    reload(!variable);
    console.log("after dispatch");
  };

  return (
    <div className="follow-card-container">
      <NavLink exact to={`/${follow.id}`} onClick={onClick}>
        <div className="follow-image-container">
          <img
            style={{ height: "50px", width: "50px", borderRadius: "45px" }}
            src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
            alt=""
          />
        </div>
      </NavLink>
      <div className="follow-card-content-container">
        <p>{follow.username}</p>
      </div>
      <div className="follow-card-follow-button-container">
        {/* <button onClick={dispatchFollow} className='follow-button'>Follow</button> */}
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
            className="follow-button"
          >
            Unfollow
          </button>
        )}
      </div>
    </div>
  );
}

export default FollowGalleryCard;