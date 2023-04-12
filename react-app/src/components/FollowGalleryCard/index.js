// Necessary imports
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useModal } from '../../context/Modal'
import './FollowGalleryCard.css'

function FollowGalleryCard({ follow, flag }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Consume modal for desired function
    const { closeModal } = useModal()

    // onClick function
    const onClick = () => {
        closeModal()
    }

    // follow function
    const dispatchFollow = () => {
        alert('follow feature')
    }

    // unfollow function
    const dispatchUnfollow = () => {
        alert('unfollow feature')
    }


    return (
                    <div className='follow-card-container'>
                            <NavLink exact to={`/${follow.id}`} onClick={onClick}>
                                <div className='follow-image-container'>
                                    <img style={{height: '50px', width: '50px', borderRadius: '45px' }} src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' alt='' />
                                </div>
                            </NavLink>
                            <div className='follow-card-content-container'>
                                <p>{follow.username}</p>
                            </div>
                            <div className='follow-card-follow-button-container'>
                                {/* <button onClick={dispatchFollow} className='follow-button'>Follow</button> */}
                                {flag ? ( <button onClick={dispatchFollow} className='follow-button'>Follow</button> ) : ( <button onClick={dispatchUnfollow} className='follow-button'>Unfollow</button> )}
                            </div>


                            

                    </div>
    )
}

export default FollowGalleryCard