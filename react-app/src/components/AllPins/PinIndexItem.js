import React, { useState } from "react";
import "./AllPins.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as pinsAction from "../../store/pin";
import { getBoardDetail, getUserBoards } from "../../store/board";
import { defaultImage } from "../SinglePin";
import OpenModalicon from "../OpenModalicon";
import EditPin from "../EditPin";

import DeleteModal from "../DeletePinModal";

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

  const allUserBoardsObj = useSelector((state) => state.boards.userBoards);
  // const userBoards = user?.boards || [];
  const userBoards = Object.values(allUserBoardsObj);

  let changingBoardId = board;
  const changeBoard = (id) => {
    changingBoardId = id;
    setBoard(id);
  };

  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  const showDropDownIdName =
    "save-dropdown" + (showDropDownMenu ? "" : " hidden");

  const unsaveButtonClick = async (e) => {
    e.preventDefault();
    changeBoard(0);

    await dispatch(pinsAction.unSavePinThunk(pin))
      .then(() => {
        if (save === false) setSave(true);
        else setSave(false);
        changeBoard(0);
      })
      .then(() => {
        // if (page === "AllPins") history.push(`/pins`);
        if (page === "BoardDetail") dispatch(getBoardDetail(thisBoardId));
        if (page === "ProfilePage") dispatch(getUserBoards());
      });
  };

  const saveButtonClick = async (e) => {
    e.preventDefault();
    changeBoard(changingBoardId);
    await dispatch(pinsAction.savePinThunk(pin, changingBoardId)).then(() => {
      if (save === false) setSave(true);
      else setSave(false);
    });
  };

  if (!user.id || !pin.id) return <div>Loading</div>;

  return (
    <div key={pin.id} className="pinIndexItem">
      {/* <Link to={{
            pathname:`/pins/${pin.id}`, state:{thisBoardId:changingBoardId, thisBoardName:thisBoardName}}}>

        <img src={pin.url} alt={pin.name} className="pinImg" />
      </Link> */}
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
        {/* <select
          className="boardOption"
          onSubmit={(e) => {
            setBoard(Number(e.target.value));
          }}
          onChange={(e) => {
            changeBoard(Number(e.target.value));
          }}
          value={savedBoardId || changingBoardId}
          name="board"
          placeholder="Choose a board"
        >
          <option value="0" className="option">
            Profile
          </option> */}
        <div
          onClick={() =>
            showDropDownMenu
              ? setShowDropDownMenu(false)
              : setShowDropDownMenu(true)
          }
        >
          Profile <i className="fas fa-solid fa-angle-down"></i>
        </div>

        {/* </select> */}
        {save || page === "ProfilePage" ? (
          <button className="saveButton" onClick={unsaveButtonClick}>
            Unsave
          </button>
        ) : (
          <button className="saveButton" onClick={saveButtonClick}>
            Save
          </button>
        )}
      </div>
      <div className={showDropDownIdName}>
        {userBoards.length > 0 &&
          userBoards.map((b) => (
            <div key={b.id} value={b.id} className="saveBoardLine">
              <img
                src={
                  b.board_cover ||
                  "https://as2.ftcdn.net/v2/jpg/03/64/76/97/1000_F_364769719_nOVnv8n06e2l2YS3u7NCwzcySTjD0YOe.jpg"
                }
                alt="board_cover"
              ></img>
              <div>{b.name}</div>
            </div>
          ))}
      </div>
      {/* {isCreated(pin, user) ? 
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
      </div> : null
    } */}
    </div>
  );
};

export default PinIndexItem;
