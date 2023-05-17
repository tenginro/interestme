import React, { useEffect, useRef, useState } from "react";
import "./AllPins.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as pinsAction from "../../store/pin";
import { getBoardDetail, getUserBoards } from "../../store/board";
import { defaultImage } from "../SinglePin";
import OpenModalicon from "../OpenModalicon";
import EditPin from "../EditPin";

import DeleteModal from "../DeletePinModal";
import OpenModalMenuItem from "../OpenModalMenuItem";
import CreateBoard from "../CreateBoard";

export const whichBoard = (pin, user, thisBoardId, thisBoardName) => {
  let board_info = [0, "Profile"];
  if (thisBoardId && thisBoardName) board_info = [thisBoardId, thisBoardName];
  else if (user?.boards) {
    let the_board;
    user?.boards.forEach((b) => {
      b?.Pins.forEach((p) => {
        if (p.id === pin.id) the_board = b;
      });
    });

    if (the_board) {
      board_info = [the_board.id, the_board.name];
    }
  }
  return board_info[0];
};

export const isSaved = (pin, user, inThisBoard) => {
  let saveOrNot = false;

  if (inThisBoard) saveOrNot = true;
  else if (pin?.user_saved !== undefined) {
    pin?.user_saved.forEach((s) => {
      if (s.id === user.id) {
        saveOrNot = true;
      }
    });
  }
  return saveOrNot;
};

export const isCreated = (pin, user) => {
  if (user.id === pin.user_id) {
    return true;
  }
  return false;
};

const PinIndexItem = ({
  pin,
  user,
  inThisBoard,
  thisBoardId,
  thisBoardName,
  page,
}) => {
  const dispatch = useDispatch();
  const savedBoardId = pin?.boards?.filter((b) => b.user_id === user?.id)[0]
    ?.id;
  const savedBoardName = pin?.boards?.filter((b) => b.user_id === user?.id)[0]
    ?.name;
  const [save, setSave] = useState(isSaved(pin, user, inThisBoard));
  const [board, setBoard] = useState(
    whichBoard(pin, user, thisBoardId, thisBoardName)
  );
  const history = useHistory();
  const ulRef = useRef();

  const allUserBoardsObj = useSelector((state) => state.boards.userBoards);
  const userBoards = Object.values(allUserBoardsObj);

  const allUserSavedPins = useSelector((state) => state.pins.savedPins);
  const savedPins = Object.values(allUserSavedPins);

  let changingBoardId = board;
  const changeBoard = (id) => {
    changingBoardId = id;
    setBoard(id);
  };

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
    "save-dropdown" + (showDropDownMenu ? "" : " hidden");

  const saveToBoard = async (e, boardId) => {
    e.preventDefault();
    await dispatch(pinsAction.savePinThunk(pin, boardId)).then(() =>
      dispatch(getUserBoards())
    );
  };
  const unsaveFromBoard = async (e, boardId) => {
    e.preventDefault();
    await dispatch(pinsAction.unSavePinThunk(pin, boardId)).then(() => {
      if (page === "BoardDetail") dispatch(getBoardDetail(thisBoardId));
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
    <div className="pinIndex">
      <div key={pin.id} className="pinIndexItem">
        
        <Link to={`/pins/${pin.id}`}>
          <img
            src={pin.url}
            alt={pin.name}
            className="pinImg"
            onError={defaultImage}
          />
        </Link>
        
        {isCreated(pin, user) ? (
          <div className="boardNSaveEdit">
            <OpenModalicon
              modalComponent={<EditPin pin={pin} />}
              iconType={"editPen"}
              pin={pin}
            />
            <OpenModalicon
              modalComponent={<DeleteModal pin={pin} />}
              iconType={"trashCan"}
              pin={pin}
            />
          </div>
        ) : null}
        <div className="boardNSave">
          <div onClick={openDropDownMenu}>
            Profile <i className="fas fa-solid fa-angle-down"></i>
          </div>
          {isSavedInProfile() ? (
            <button className="saveButton" onClick={(e) => unsaveFromBoard(e, 0)}>
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
                <button className="saveButton" onClick={(e) => saveToBoard(e, 0)}>
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
                  <i className="fas fa-solid fa-plus fa-2x"></i>
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
      </div>
      <div>
        <p className="pinName">{pin.name}</p>
        <div className="allPinUserInfo">
          <img 
          src = {pin.User?.profile_pic}
          alt = {pin.User?.username}
          className="user-pic-allPin"
          />
          <p style={{fontSize: "12px"}}>{pin.User?.username}</p>
        </div>
      </div>

    </div>
  );
};

export default PinIndexItem;
