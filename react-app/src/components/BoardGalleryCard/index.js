// Necessary imports
import { NavLink, useHistory, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getBoardDetail } from '../../store/board';
import './BoardGalleryCard.css'

function BoardGalleryCard({ board }) {

    console.log('number of pins: ', board.Pins)

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    const pins = board.Pins?.length

    // onClick function
    const onClick = () => {
        dispatch(getBoardDetail(board.id))
        console.log('after dispatch')

    }

    return (
        <li>
            <div className='board-card-container'>
                <NavLink exact to={`/boards/${board.id}`} onClick={onClick}>
                    <div className='board-image-container'>
                        <img src={board.board_cover} />
                    </div>
                    <div className='board-card-content-container'>
                        <h2 className='item'>{board.name}</h2>
                        {pins && (<p className='item'>{pins} {pins && pins === 1 ? 'pin' : 'pins'}</p>)}
                    </div>
                </NavLink>
            </div>
        </li>
    )
}

export default BoardGalleryCard;
