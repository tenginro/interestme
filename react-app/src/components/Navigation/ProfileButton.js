import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./Navigation.css";
import LoginFormPage from "../LoginFormPage";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();
  const { setModalContent } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
  };

  const managePinsClick = (e) => {
    e.preventDefault();
    history.push("/pins/current");
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
    {user ?  <button className="main_page_login_btn" onClick={openMenu}>
        <i className="fas fa-user-circle" />
    </button>
      :
      <button
        className="main_page_login_btn"
        onClick={() => setModalContent(<LoginFormPage />)}
      >
        Log in
      </button>}
      <ul className={ulClassName} ref={ulRef}>
        {user && (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={managePinsClick} className="dropDown-Button">
                Manage Pins
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        )
        // : (
        //   <>
        //     <OpenModalButton
        //       buttonText="Log In"
        //       onItemClick={closeMenu}
        //       modalComponent={<LoginFormModal />}
        //     />

        //     <OpenModalButton
        //       buttonText="Sign Up"
        //       onItemClick={closeMenu}
        //       modalComponent={<SignupFormModal />}
        //     />
        //   </>
        // )
        }
      </ul>
    </>
  );
}

export default ProfileButton;
