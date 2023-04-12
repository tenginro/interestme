// Necessary imports
import { NavLink } from 'react-router-dom'
import './PinGalleryCard.css'

function PinGalleryCard({ pin }){
    return (
        <div className="pin-gallery-card-container">
            <NavLink exact to={`/pins/${pin.id}`}>
                <div className='pin-image-container'>
                    <img src={pin.url} alt='' />
                </div>
                <div className='pin-name-container'>
                    <h4>{pin.name}</h4>
                </div>
            </NavLink>
        </div>
    )
}

export default PinGalleryCard