import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import logo from "../LandingPage/Assets/icon.png";
import * as sessionActions from "../../store/session";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };
  const demoUserSubmitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login("demouser@aa.io", "password"))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div id="loginModal">
      <div className="logoTitle">
        <img id="logo_in_logo" src={logo} alt="Logo" />
        <h1>Welcome to Tinterest</h1>
      </div>
      <div>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div>
            <ul>
              {errors.map((error, idx) => (
                <li className="errorListing" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label>
              <div>Email</div>
              <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <div>Password</div>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="loginSubmitButtonContainer">
            <button
              className={
                email.length < 4 || password.length < 6
                  ? "loginSubmitButton disabled"
                  : "loginSubmitButton"
              }
              type="submit"
              disabled={email.length < 4 || password.length < 6}
            >
              <div>Log In</div>
            </button>
          </div>
          <div className="demo-user-btn-container">
            <button
              className="demoUserButton"
              onClick={demoUserSubmitHandler}
              type="submit"
            >
              Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
