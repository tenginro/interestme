// Necessary imports
import { useSelector } from "react-redux"
import FollowGalleryCard from "../FollowGalleryCard"
import './FollowGallery.css'

function FollowGallery({ follows, flag }){
    
    console.log('follows: ', follows)

    return (
        <div className="follow-gallery-container">
            <h1>Follow Gallery</h1>
            <div className="follows-ul-container">
                {follows.map(follow => (
                    <FollowGalleryCard key={follow.id} follow={follow} flag={flag} />
                ))}
            </div>
        </div>
        
    )
}

export default FollowGallery