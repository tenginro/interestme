// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserBoards } from "../../store/board";
import BoardGalleryCard from "../BoardGalleryCard"
import './BoardGallery.css'


function BoardGallery() {
    // Create dispatch method
    const dispatch = useDispatch()

    // Load boards into state on component render
    useEffect(() => {
        dispatch(getUserBoards())
    }, [dispatch])

    // Create a reference to the spots state slice
    const boards = useSelector(state => Object.values(state.boards.userBoards))
    // console.log('BoardGallery boards: ', boards)
    if(Object.values(boards).length === 0) return null

    return (
        <div className="board-gallery-container">
            <h1>Board Gallery</h1>
            <ul className="board-gallery-list">
                {boards.map(board => (
                    <BoardGalleryCard key={board.id} board={board} />
                ))}
            </ul>
        </div>
    )
}

export default BoardGallery;
