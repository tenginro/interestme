// Necessary imports
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './DropdownMenuButton.css'

function DropdownMenuButton(){
    // Create state variables
    const [ showMenu, setShowMenu ] = useState('')

    // Create useRef hook
    const ulRef = useRef()

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
            <h3>Icon Goes Here</h3>
            <ul className={showMenu ? 'dropdown-menu' : 'hidden'} ref={ulRef}>
                <li>
                    <p>Edit</p>
                </li>
                <li>
                    <p>Delete</p>
                </li>
            </ul>
        </div>
    )
}

export default DropdownMenuButton