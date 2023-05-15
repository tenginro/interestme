import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { actionClearPin, getPinDetail } from "../../store/pin";
import * as sessionAction from "../../store/session";
import * as pinsAction from "../../store/pin";
import { whichBoard, isSaved } from "../AllPins/PinIndexItem";
import defaultPinPic from "../LandingPage/Assets/default-pin-pic.png";
import "./PinDetail.css";
import { getBoardDetail, getUserBoards } from "../../store/board";
import OpenModalMenuItem from "../OpenModalMenuItem";
import CreateBoard from "../CreateBoard";

export const defaultImage = (e) => {
  e.target.onerror = null;
  e.target.src = defaultPinPic;
};

function isFollowed(user, pin) {
  return Boolean(user.following.filter((f) => f.id === pin.user_id).length);
}

const Pin = () => {
  // const location = useLocation();
  // const { from } = location.state;
  const { pinId } = useParams();
  // const thisBoardId = location.boardProps.thisBoardId
  // const thisBoardName = location.boardProps.thisBoardName
  const dispatch = useDispatch();
  const ulRef = useRef();
  const history = useHistory();

  const pin = useSelector((state) => state.pins.singlePin);
  const user = useSelector((state) => state.session.user);
  const [follow, setFollow] = useState(false);
  const thisBoardId = pin?.boards?.filter((b) => b.user_id === user?.id)[0]?.id;
  const thisBoardName = pin?.boards?.filter((b) => b.user_id === user?.id)[0]
    ?.name;
  const [board, setBoard] = useState(
    whichBoard(pin, user, thisBoardId, thisBoardName)
  );
  const [save, setSave] = useState(false);

  // const userBoards = user?.boards || [];
  const allUserBoardsObj = useSelector((state) => state.boards.userBoards);
  // const userBoards = user?.boards || [];
  const userBoards = Object.values(allUserBoardsObj);

  const allUserSavedPins = useSelector((state) => state.pins.savedPins);
  const savedPins = Object.values(allUserSavedPins);

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
    return () => dispatch(actionClearPin());
  }, [dispatch, pinId, save, follow]);
  //when hitting save button, it will reload the whole page

  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  const openDropDownMenu = () => {
    if (showDropDownMenu) return;
    setShowDropDownMenu(true);
  };

  useEffect(() => {
    if (!showDropDownMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowDropDownMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showDropDownMenu]);

  const showDropDownIdName =
    "save-dropdown pinDetail" + (showDropDownMenu ? "" : " hidden");

  const saveToBoard = async (e, boardId) => {
    e.preventDefault();
    await dispatch(pinsAction.savePinThunk(pin, boardId)).then(() =>
      dispatch(getUserBoards())
    );
  };
  const unsaveFromBoard = async (e, boardId) => {
    e.preventDefault();
    console.log("boardId", boardId);
    await dispatch(pinsAction.unSavePinThunk(pin, boardId)).then(() => {
      dispatch(getUserBoards());
    });
  };
  const isSavedInProfile = () => {
    if (
      savedPins.filter((p) => p.id === pin.id).length > 0 &&
      userBoards.filter((b) => b.Pins.filter((p) => p.id === pin.id) === 0)
        .length === 0
    ) {
      return true;
    }
  };
  const SavedInThisBoard = () => {
    return userBoards.find(
      (b) => b.Pins.filter((p) => p.id === pin.id).length > 0
    );
  };
  const closeMenu = () => setShowDropDownMenu(false);

  if (!user.id || !pin.id) return <div>Loading</div>;

  return (
    <div className="single-pin_container">
      <div className="leftSide">
        <img
          className="single_pin_image"
          src={pin.url}
          alt="pin.url"
          onError={defaultImage}
        />
      </div>
      <div className="rightSide">
        <div className="profile_saved-container">
          {/* <select
            id="profile_dropdown-menu"
            onSubmit={(e) => {
              setBoard(Number(e.target.value));
            }}
            onChange={(e) => {
              changeBoard(Number(e.target.value));
            }}
            value={thisBoardId || changingBoardId}
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
          )} */}
          <div onClick={openDropDownMenu}>
            Profile
            <i className="fas fa-solid fa-angle-down"></i>
          </div>
          {isSavedInProfile() ? (
            <button
              className="saveButton"
              onClick={(e) => unsaveFromBoard(e, 0)}
            >
              Unsave
            </button>
          ) : (
            <button className="saveButton" onClick={(e) => saveToBoard(e, 0)}>
              Save
            </button>
          )}
        </div>
        <div className={showDropDownIdName} ref={ulRef}>
          <div className="dropDownContainer">
            <div>Quick save and organize later</div>
            <div className="saveBoardLine">
              <div className="boardNameCover">
                <div>
                  <i className="fas fa-solid fa-clock-rotate-left fa-3x"></i>
                </div>
                <div style={{ paddingLeft: "10px" }}>Profile</div>
              </div>
              {isSavedInProfile() ? (
                <button
                  className="saveButton"
                  onClick={(e) => unsaveFromBoard(e, 0)}
                >
                  Unsave
                </button>
              ) : (
                <button
                  className="saveButton"
                  onClick={(e) => saveToBoard(e, 0)}
                >
                  Save
                </button>
              )}
            </div>
            <div className="saveDropDownSecondPart">
              <div>Save to board</div>
              {userBoards.length > 0 &&
                userBoards.map((b) => (
                  <div key={b.id} value={b.id} className="saveBoardLine">
                    <div
                      className="boardNameCover"
                      onClick={() => history.push(`/boards/${b.id}`)}
                    >
                      <div>
                        <img
                          src={
                            b.board_cover ||
                            "https://as2.ftcdn.net/v2/jpg/03/64/76/97/1000_F_364769719_nOVnv8n06e2l2YS3u7NCwzcySTjD0YOe.jpg"
                          }
                          alt="board_cover"
                        ></img>
                      </div>
                      <div>{b.name}</div>
                    </div>
                    <div>
                      {b.Pins?.filter((p) => p.id === pin.id).length > 0 ? (
                        <button
                          className="saveButton"
                          onClick={(e) => unsaveFromBoard(e, b.id)}
                        >
                          Unsave
                        </button>
                      ) : (
                        <button
                          className="saveButton"
                          onClick={(e) => saveToBoard(e, b.id)}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="saveBoardLine">
              <div className="boardNameCover">
                <div>
                  <i className="fas fa-solid fa-plus fa-3x"></i>
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <OpenModalMenuItem
                    itemText="Create board"
                    onItemClick={closeMenu}
                    modalComponent={<CreateBoard />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p id="name_tag">{pin.name}</p>
          <p className="pinDescription">{pin.description}</p>
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
          ) : isFollowed(user, pin) ? (
            <button
              className="unfollow_btn"
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(sessionAction.removeFollowThunk(pin.user_id));
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
