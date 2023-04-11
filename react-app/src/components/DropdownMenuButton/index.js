// Necessary imports
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalMenuItem from '../OpenModalMenuItem'
import './DropdownMenuButton.css'

function DropdownMenuButton(){
    // Create state variables
    const [ showMenu, setShowMenu ] = useState('')

    // Create useRef hook
    const ulRef = useRef()
    const eleRef = useRef()

    // Function to open dropdown menu
    const openMenu = () => {
        if(showMenu) return
        setShowMenu(true)
    }

    // Function to close dropdown menu
    const closeMenu = () => setShowMenu(false)

    // Create event listener for closing menu
    useEffect(() => {
        if(!showMenu) return

        const closeMenu = (e) => {
            if(!ulRef.current.contains(e.target)) setShowMenu(false)
        }

        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])


    return (
        <div className='dropdown-menu-container' onClick={openMenu}>
            <h3 className={showMenu ? 'active pointer' : 'pointer'}>Icon Goes Here</h3>
            {showMenu && ( 
                <>
                    <p className='dropdown-header'>Board Options</p>
                </>
             )}
            <ul className={showMenu ? 'dropdown-menu' : 'hidden'} ref={ulRef}>
                <OpenModalMenuItem itemText='Edit' onItemClick={closeMenu} modalComponent={<h1>Edit Board Modal Component Goes Here</h1>} />
                <OpenModalMenuItem itemText='Delete' onItemClick={closeMenu} modalComponent={<h1>Delete Board Modal Component Goes Here</h1>} />
            </ul>
        </div>
    )
}

export default DropdownMenuButton