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
        console.log('board details useEffect')
        dispatch(getBoardDetail(boardId))
        console.log('after dispatch')
        console.log('board inside useEffect: ', board)
    }, [dispatch, boardId])
    
    // console.log('before')
    console.log('singleBoard: ', board)
    // console.log('after')
    
    // const correctBoard = board?.id === boardId
    
    // console.log('correctBoard: ', correctBoard)
    
    if(!board) return <h1>Null</h1>
    // if(!correctBoard) return null

    // if(Object.values(board).length === 0) return null

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
