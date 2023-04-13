// Necessary imports
import { useSelector } from "react-redux"
import { useState } from "react"
import { useModal } from "../../context/Modal"
import FollowGalleryCard from "../FollowGalleryCard"
import './FollowGallery.css'

function FollowGallery({ follows, flag }){
    
    console.log('follows: ', follows)
    // Consume useModal for desired function
    const { closeModal } = useModal()

    // Create state variable
    const [ boolean, setBoolean ] = useState(false)

    return (
        <div className="follow-gallery-container">
            <div className="follow-header-container">
                <h1>{flag ? 'Followers' : 'Following'}</h1>
                <i style={{ cursor: 'pointer' }} onClick={() => closeModal()} className="fa-solid fa-xmark" />
            </div>
            <div className="follows-ul-container">
                {follows.map(follow => (
                    <FollowGalleryCard key={follow.id} follow={follow} flag={flag} reload={setBoolean} variable={boolean} />
                ))}
            </div>
        </div>
        
    )
}

export default FollowGallery