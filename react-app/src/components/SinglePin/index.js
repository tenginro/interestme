import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { actionClearPin, getPinDetail } from "../../store/pin";
import * as sessionAction from "../../store/session";
import * as pinsAction from "../../store/pin";
import { whichBoard, isSaved } from "../AllPins/PinIndexItem";
import "./PinDetail.css";

const Pin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pins.singlePin);
  const [follow, setFollow] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [board, setBoard] = useState(whichBoard(pin, user));
  const [save, setSave] = useState(false);

  console.log("inside single Pin user.id", user.id);
  console.log("inside single Pin pin.user_saved", pin.user_saved);

  const userBoards = user?.boards || [];

  let changingBoardId = board;
  const changeBoard = (id) => {
    changingBoardId = id;
    setBoard(id);
  };

  const checkFollow = () => {
    const pinAuthorId = pin.user_id;

    if (user?.following) {
      const following = user.following;
      following.forEach((f) => {
        if (f.id === pinAuthorId) setFollow(true);
      });
    }
  };

  useEffect(() => {
    dispatch(getPinDetail(pinId));
    checkFollow();
    // isSaved();
    // return () => dispatch(actionClearPin());
  }, [dispatch, pinId, save]);
  //when hitting save button, it will reload the whole page

  console.log("above loading", pin);
  console.log("above loading pin.User", pin?.User);
  console.log("user.id", user?.id);
  console.log("pin.id", pin?.id);
  // if(!pin) return null;
  if (!user.id || !pin.id) return <div>Loading</div>;

  return (
    <div className="single-pin_container">
      <div className="leftSide">
        <img className="single_pin_image" src={pin.url} alt="pin.url" />
      </div>
      <div className="rightSide">
        <div className="profile_saved-container">
          <select
            id="profile_dropdown-menu"
            onChange={(e) => {
              changeBoard(Number(e.target.value));
            }}
            value={changingBoardId}
            name="board"
            placeholder="Choose a board"
          >
            <option value="0">Profile</option>
            {userBoards.length > 0 &&
              userBoards.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
          {isSaved(pin, user) ? (
            <button
              className="unsaved_btn"
              onClick={async (e) => {
                e.preventDefault();
                changeBoard(0);
                await dispatch(pinsAction.unSavePinThunk(pin)).then(() => {
                  if (save === false) setSave(true);
                  else setSave(false);
                });
              }}
            >
              Unsave
            </button>
          ) : (
            <button
              className="saved_btn_"
              onClick={async (e) => {
                e.preventDefault();
                changeBoard(changingBoardId);
                await dispatch(
                  pinsAction.savePinThunk(pin, changingBoardId)
                ).then(() => {
                  if (save === false) setSave(true);
                  else setSave(false);
                });
              }}
            >
              Save
            </button>
          )}
        </div>
        <div>
          <p id="name_tag">{pin.name}</p>
          <p>{pin.description}</p>
        </div>

        <div className="single-pin_user-follow_container">
          <h4>{pin.User?.username}</h4>
          {pin.User?.username === user.username ? (
            <div></div>
          ) : follow ? (
            <button
              className="unfollow_btn"
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(
                  sessionAction.removeFollowThunk(user, pin.user_id)
                );
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
                await dispatch(sessionAction.addFollowThunk(pin.user_id));
                setFollow(true);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pin;
