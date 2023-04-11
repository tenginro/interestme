// Necessary imports
import React from 'react'
import { useModal } from '../../context/Modal'

function OpenModalMenuItem({ modalComponent, itemText, onItemClick, onModalClose }){
    // Consume ModalContext
    const { setModalContent, setOnModalClose } = useModal()

    // Create onClick function
    const onClick = () => {
        if(onModalClose) setOnModalClose(onModalClose)
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }


    return (
        <li onClick={onClick}>{itemText}</li>
    )
}

export default OpenModalMenuItem