// Necessary imports
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OpenModalMenuItem from '../OpenModalMenuItem'
import FollowGallery from '../FollowGallery'
import './ProfilePage.css'

function ProfilePage(){
    // Create a reference to the session user 
    const user = useSelector(state => state.session.user)

    console.log('currentUser: ', user)

    
    const [ saved, setSaved ] = useState(true)
    
    // let boards = created ? user.pins : user.saved_pins
    
    if(!user) return null

    return (
        <div className='profile-page-container'>
            <div className='profile-header-container'>
                <h1>Profile Page</h1>
            </div>
            <div className='profile-picture-container'>
                <img style={{height: '150px', width: '150px', borderRadius: '45px' }} src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' alt='' />
            </div>
            <div className='username-container'>
                <h2>{user.username}</h2>
            </div>
            <ul className='followers-container'>
                <OpenModalMenuItem itemText={`${user.following.length} following`} modalComponent={<FollowGallery follows={user.following} />} />
                <OpenModalMenuItem itemText={`${user.followers.length} followers`} modalComponent={<FollowGallery follows={user.followers} flag={true} />} />
            </ul>
            <div className='created-saved-container'>
                <button className={!saved ? 'activated' : ''} onClick={() => setSaved(false)}>Created</button>
                <button className={saved ? 'activated' : ''} onClick={() => setSaved(true)}>Saved</button>
            </div>
            <div className='plus-sign-container'>
                <p>Slider Icon Goes Here</p>
                <p>Plus Sign Icon Goes Here</p>
            </div>
            <div className='profile-boards-container'>
                {saved && (
                    <h2>Boards You Created And The Pins You Saved</h2>
                )}
                {!saved && (
                    <h2>Pins You Created</h2>
                )}
            </div>
        </div>
    )
}

export default ProfilePage