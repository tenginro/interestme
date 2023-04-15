// Necessary imports
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../OpenModalMenuItem";
import DeleteBoard from "../DeleteBoard";
import EditBoard from "../EditBoard";
import "./DropdownMenuButton.css";

function DropdownMenuButton({ board }) {
  // Create state variables
  const [showMenu, setShowMenu] = useState("");

  // Create useRef hook
  const ulRef = useRef();
  const eleRef = useRef();

  // Function to open dropdown menu
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // Function to close dropdown menu
  const closeMenu = () => setShowMenu(false);

  // Create event listener for closing menu
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="dropdown-menu-container" onClick={openMenu}>
      <h2 className={showMenu ? "active pointer" : "pointer"}>
        <i className="fa-solid fa-ellipsis"></i>
      </h2>
      <div className={showMenu ? "absolute-container" : "hidden"}>
        {showMenu && (
          <>
            <p className="dropdown-header">Board Options</p>
          </>
        )}
        <ul className={showMenu ? "dropdown-menu-2" : "hidden"} ref={ulRef}>
          <OpenModalMenuItem
            itemText="Edit"
            onItemClick={closeMenu}
            modalComponent={<EditBoard board={board} />}
          />
          <OpenModalMenuItem
            itemText="Delete"
            onItemClick={closeMenu}
            modalComponent={<DeleteBoard board={board} />}
          />
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenuButton;
