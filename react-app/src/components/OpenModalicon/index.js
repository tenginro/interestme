import React from 'react'
import { useModal } from '../../context/Modal'
import {Link} from 'react-router-dom'
function OpenModalicon({ modalComponent, onItemClick, onModalClose, iconType, pin }){
    // Consume ModalContext
    const { setModalContent, setOnModalClose } = useModal()

    // Create onClick function
    const onClick = () => {
        if(onModalClose) setOnModalClose(onModalClose)
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }

    // return (
    //     <li onClick={onClick}>{itemText}</li>
    // )
    if (iconType === 'editPen') {
        return (
        <button 
        className="editButton"
        onClick={onClick}
        >
            <Link key={pin.id} to={`/pins/${pin.id}/edit`}>
            <i class="fa-solid fa-pen"></i>
            </Link>
        </button>
        )
    }
}

export default OpenModalicon