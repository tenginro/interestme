import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

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
    history.push("/");
    closeMenu();
  };

  const clickToUserProfile = (e) => {
    history.push("/user");
    // window.location.reload(false);
  };

  const createBoardClick = (e) => {
    e.preventDefault();
    history.push("/boards/new");
    closeMenu();
  };
  const editBoardClick = (e) => {
    e.preventDefault();
    history.push("/boards/current");
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <div className="profileDropDownButtons">
          <NavLink exact to="/user"> 
          <img 
          style={{height:"40px", width:"40px", borderRadius:"50%"}}
          src={user?.profile_pic}
          alt="profileImage"
          />
          </NavLink>
          {/* <button
            className="main_page_login_btn login"
            onClick={() => {
              clickToUserProfile();
            }}
          >
            {user?.username[0]}
          </button> */}
          <button className="profileDownButton" onClick={openMenu}>
            <i className="fas fa-solid fa-angle-down"></i>
          </button>
        </div>
      ) : (
        <div className="loginSignUpButtons">
          <button
            className="main_page_login_btn notLogIn"
            onClick={() => setModalContent(<LoginFormModal />)}
          >
            Log in
          </button>
          <button
            className="main_page_signup_btn"
            onClick={() => setModalContent(<SignupFormModal />)}
          >
            Sign up
          </button>
        </div>
      )}
      <ul className={ulClassName} ref={ulRef}>
        {user && (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button
                className="viewProfileButton"
                onClick={() => {
                  clickToUserProfile();
                }}
              >
                View your profile
              </button>
            </li>
            <li>
              <button className="logoutButton" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
