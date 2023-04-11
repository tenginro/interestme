// Necessary imports
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBoardDetail } from '../../store/board'
import PinGalleryCard from '../PinGalleryCard'
import {useModal} from "../../context/Modal"
import DropdownMenuButton from '../DropdownMenuButton'
import './BoardDetails.css'

function BoardDetails() {
    // Extract parameter variables from parameter object
    const { boardId } = useParams()
    console.log('id: ', boardId)

    // Create dispatch method
    const dispatch = useDispatch()
    const { setModalContent } = useModal();
    // Subscribe to single board slice of state
    const board = useSelector(state => state.boards.singleBoard)

    // Subscribe to user session slice of state
    const currentUser = useSelector(state => state.session.user)

    // Upon component render, dispatch the action to load the single board into the redux store for retrieval
    // let board
    useEffect(() => {
        dispatch(getBoardDetail(boardId))
    }, [dispatch, boardId])

    if(!board) return null

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
                <DropdownMenuButton />
            </div>
            <div className='board-cover-container'>
                <img src={board.board_cover} alt="board-cover-pic" />
            </div>
            <p className='secret'>Secret Board? {board.secret}</p>
        </div>




        <h3>Pin Gallery</h3>
        <p>{board.Pins?.length} pins</p>
        {board.Pins &&
          board.Pins.map((pin) => <PinGalleryCard key={pin.id} pin={pin} />)}
      </div>
    );
}

export default BoardDetails
