// Type Variables
// const LOAD_BOARDS = "boards/load_all_boards"
const LOAD_BOARD_DETAIL = "boards/load_one_board";
const LOAD_USER_BOARDS = "boards/load_user_boards";
const CREATE_BOARD = "boards/create_board";
const UPDATE_BOARD = "boards/update_board";
const DELETE_BOARD = "boards/delete_board";
const CLEAR_BOARD = "boards/clear_board";
const CLEAR_BOARDS = "boards/clear_boards";

export const actionLoadBoardDetail = (board) => ({
  type: LOAD_BOARD_DETAIL,
  board,
});

export const actionLoadUserBoards = (boards) => ({
  type: LOAD_USER_BOARDS,
  boards,
});

export const actionCreateBoard = (board) => ({
  type: CREATE_BOARD,
  board,
});

export const actionUpdateBoard = (board) => ({
  type: UPDATE_BOARD,
  board,
});

export const actionDeleteBoard = (board) => ({
  type: DELETE_BOARD,
  board,
});

export const actionClearBoard = () => ({
  type: CLEAR_BOARD,
});

export const actionClearBoards = () => ({
  type: CLEAR_BOARDS,
});

export const getBoardDetail = (id) => async (dispatch) => {
  // console.log("getBoardDetail thunk running");
  const res = await fetch(`/api/boards/${id}`);
  if (res.ok) {
    const board = await res.json();
    // console.log("thunk boardDetail res: ", board);
    await dispatch(actionLoadBoardDetail(board));
    return board;
  }
  return res;
};

export const getUserBoards = () => async (dispatch) => {
  const res = await fetch("/api/boards");
  if (res.ok) {
    const boards = await res.json();
    await dispatch(actionLoadUserBoards(boards));
    return boards;
  }
  return res;
};

export const createBoard = (board) => async (dispatch) => {
  const res = await fetch(`/api/boards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(board),
  });
  if (res.ok) {
    const board = await res.json();
    await dispatch(actionCreateBoard(board));
    return board;
  }
  // return res
};

export const updateBoard = (board, boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(board),
  });
  if (res.ok) {
    const updatedBoard = await res.json();
    await dispatch(actionUpdateBoard(updatedBoard));
    return updatedBoard;
  }
  return res;
};

export const deleteBoard = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    await dispatch(actionDeleteBoard(boardId));
  }
  return res;
};

//  Initial State
const initialState = {
  userBoards: {},
  singleBoard: {},
};

// Reducer
const boardReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_BOARD_DETAIL:
      return { ...state, singleBoard: { ...action.board } };
    case LOAD_USER_BOARDS:
      const boards = normalizingData(action.boards);
      newState.userBoards = { ...boards };
      return newState;
    case CREATE_BOARD:
      return newState;
    case UPDATE_BOARD:
      return newState;
    case DELETE_BOARD:
      return newState;
    case CLEAR_BOARDS:
      return { ...state, userBoards: {} };
    case CLEAR_BOARD:
      return { ...state, singleBoard: {} };
    default:
      return state;
  }
};

// Normalize Data
export const normalizingData = (data) => {
  const obj = {};
  data.forEach((ele) => (obj[ele.id] = ele));
  return obj;
};
export default boardReducer;
