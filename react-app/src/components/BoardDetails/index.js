// Necessary imports
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBoardDetail } from '../../store/board'
import PinGalleryCard from '../PinGalleryCard'

function BoardDetails() {
    // Extract parameter variables from parameter object
    const { boardId } = useParams()
    console.log('id: ', boardId)

    // Create dispatch method
    const dispatch = useDispatch()

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
        <div className='whole-container'>
            <h1>{board.name}</h1>
            <img src={board.board_cover} />
            <p>Secret Board? {board.secret}</p>
            <h3>Pin Gallery</h3>
            <p>{board.Pins?.length} pins</p>
            {board.Pins && (board.Pins.map(pin => (
                <PinGalleryCard key={pin.id} pin={pin} />
            )))}
        </div>
    )
}

export default BoardDetails
