import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";
import logo from "../LandingPage/Assets/icon.png";
import SignupFormPage from "../SignupFormPage";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { setModalContent } = useModal();
  const { closeModal } = useModal();

  if (sessionUser) return <Redirect to="/pins" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password)).then(() => {
      closeModal();
    });
    if (data) {
      setErrors(data);
    }
  };

  const demoUserSubmitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login("demouser@aa.io", "password"))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div id="login_form_page">
      <img id="logo_in_logo" src={logo} alt="Logo" />
      <h2>Welcome to Tinterest</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <br />
        </label>
        <div>
          <input
            className="log_in-input"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />
        <label>Password</label>
        <div>
          <input
            className="log_in-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />
        <button id="log_in_submit_btn" type="submit">
          Log In
        </button>
      </form>
      <div className="OR">OR</div>

      <button
        id="sign_up_submit_btn"
        onClick={() => setModalContent(<SignupFormPage />)}
      >
        Sign Up
      </button>

      <button
        className="demo-user-btn-container"
        onClick={demoUserSubmitHandler}
        type="submit"
      >
        Demo User
      </button>
    </div>
  );
}

export default LoginFormPage;
