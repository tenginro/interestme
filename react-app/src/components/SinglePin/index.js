import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { actionClearPin, getPinDetail } from "../../store/pin";
import * as sessionAction from "../../store/session";
import * as pinsAction from "../../store/pin";
import { whichBoard, isSaved } from "../AllPins/PinIndexItem";



const Pin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pins.singlePin);
  const [follow, setFollow] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [board, setBoard] = useState(whichBoard(pin, user));
  const [save, setSave] = useState(isSaved(pin, user));

  const userBoards = user?.boards || [];

  let changingBoardId = board;
  const changeBoard = (id) => {
    changingBoardId = id;
    setBoard(id);
  };
  const checkFollow = () => {
    const pinAuthorId = pin.user_id;

    // console.log("user.following", user.following);

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
  }, [dispatch, pinId]);

  if (!pin.User) return <div>Loading</div>;

  return (
    <div>
      <div className="leftSide">
        <img src={pin.url} alt="pin.url" />
      </div>
      <div className="rightSide">
        <select
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
      {save ? (
        <button
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
          onClick={async (e) => {
            e.preventDefault();
            changeBoard(changingBoardId);
            await dispatch(pinsAction.savePinThunk(pin, changingBoardId)).then(
              () => {
                if (save === false) setSave(true);
                else setSave(false);
              }
            );
          }}
        >
          Save
        </button>
      )}
        <h2>{pin.name}</h2>
        <p>{pin.description}</p>
        <div>
          <h4>{pin.User.username}</h4>
          {/* bugs coming from here.... singlePin state got cleared up */}
          {follow ? (
            <button
              onClick={async (e) => {
                e.preventDefault();
                console.log("click to unfollow");
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
              onClick={async (e) => {
                e.preventDefault();
                console.log("click to follow");
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
