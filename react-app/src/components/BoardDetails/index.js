// Necessary imports
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBoardDetail } from '../../store/board'
import * as boardsActions from '../../store/board'
import PinGalleryCard from '../PinGalleryCard'
import DropdownMenuButton from '../DropdownMenuButton'
import './BoardDetails.css'

function BoardDetails() {
    // Extract parameter variables from parameter object
    const { boardId } = useParams()
    console.log('id: ', boardId)

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Subscribe to single board slice of state
    const board = useSelector(state => state.boards.singleBoard)

    // Subscribe to user session slice of state
    const currentUser = useSelector(state => state.session.user)

  // Upon component render, dispatch the action to load the single board into the redux store for retrieval
  // let board
  useEffect(() => {
    dispatch(getBoardDetail(boardId));
  }, [dispatch, boardId]);

  const deleteBoardClick = (e) => {
    e.preventDefault();
    dispatch(boardsActions.deleteBoard(board.id)).then(() => {
      history.push("/boards/current");
    });
  };


  if (!board) return null;

    return (
      <div className="whole-container">
        <div className='info-container'>
            <h1>{board.name}</h1>
            <div className='manage-board-buttons-container'>
                {/* <span>
                    <button className='edit-board-btn'>
                    Edit
                    </button>
                </span>
                <span>
                    <button className="edit-user-board-btnn">
                    DELETE
                    </button>
                </span> */}
                <DropdownMenuButton board={board} />
            </div>
            <div className='board-cover-container'>
                <img src={board.board_cover} alt="board-cover-pic" />
            </div>
            <p className='secret'>{board.secret ? 'Secret Board! Shhh!' : 'Public Board'}</p>
        </div>




        <h2>{board.Pins?.length} pins</h2>
        <div className='pin-gallery-grid'>
            {board.Pins &&
            board.Pins.map((pin) => <PinGalleryCard key={pin.id} pin={pin} />)}
        </div>
      </div>
    );
}

export default BoardDetails;
