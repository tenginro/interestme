import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import logo from "../LandingPage/Assets/icon.png";

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

  return (
    <div id="loginModal">
      <div className="logoTitle">
        <img id="logo_in_logo" src={logo} alt="Logo" />
        <h1>Log In</h1>
      </div>
      <div>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
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
            <button className="loginSubmitButton" type="submit">
              <div>Log In</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
