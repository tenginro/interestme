import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import { actionClearPin, getPinDetail } from "../../store/pin";
import * as sessionAction from "../../store/session";
import * as pinsAction from "../../store/pin";
import { whichBoard, isSaved } from "../AllPins/PinIndexItem";
import "./PinDetail.css";

const Pin = () => {
  // const location = useLocation();
  // console.log('inside pinnnnn', location?.boardProps);
  // const { from } = location.state;
  const { pinId } = useParams();
  // const thisBoardId = location.boardProps.thisBoardId
  // const thisBoardName = location.boardProps.thisBoardName
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pins.singlePin);
  const [follow, setFollow] = useState(false);
  const user = useSelector((state) => state.session.user);
  const thisBoardId = pin?.boards?.filter((b)=> b.user_id === user?.id)[0]?.id
  const thisBoardName = pin?.boards?.filter((b)=>b.user_id === user?.id)[0]?.name
  const [board, setBoard] = useState(whichBoard(pin, user,thisBoardId,thisBoardName ));
  const [save, setSave] = useState(false);

  // console.log("inside single Pin thisBoardId", thisBoardId);
  // console.log("inside single Pin thisBoardName", thisBoardName);

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
    return () => dispatch(actionClearPin());
  }, [dispatch, pinId, save]);
  //when hitting save button, it will reload the whole page

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
            onSubmit={(e) => {
              setBoard(Number(e.target.value));
            }}
            onChange={(e) => {
              changeBoard(Number(e.target.value));
            }}
            value={thisBoardId||changingBoardId}
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
          <NavLink exact to={`/users/${pin.User?.id}`}>
            <div className="pinOwnerProfile">
              <img
                style={{ height: "50px", width: "50px", borderRadius: "45px" }}
                src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                alt=""
              />
              <h4>{pin.User?.username}</h4>
            </div>
          </NavLink>
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
