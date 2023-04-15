import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import logo from "../LandingPage/Assets/icon.png";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [about, setAbout] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setErrors([]);

    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(username, email, password, first_name, last_name, about)
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
        return history.push(`/pins`);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  // const SignUpButtonClassName =
  //   "SubmitButton" +
  //   (email.length < 4 ||
  //   !username.length ||
  //   !first_name.length ||
  //   !last_name.length ||
  //   !about.length ||
  //   password.length < 6 ||
  //   confirmPassword.length < 6
  //     ? " disable"
  //     : "");

  return (
    <div className="sign_up_modal">
      <img id="logo" src={logo} alt="Logo" />
      <h1 className="welcome">Welcome to Tinterest</h1>
      <form onSubmit={handleSubmit} className="signUpForm">
        <div className="errorMessageContainer">
          <ul>
            {errors.map((error, idx) => (
              <li className="errorListing" key={idx}>
                {error}
              </li>
            ))}
          </ul>
        </div>
        <div className="inputField">
          <label className="signUpLabel">Email</label>
          <input
            type="text"
            placeholder="Email is required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username is required"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name is required"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name is required"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <label>About</label>
          <textarea
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className="inputField">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password is required, must be more than 5 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <button
            type="submit"
            className="SubmitButton"
            // disabled={
            //   email.length < 4 ||
            //   !username.length ||
            //   !first_name.length ||
            //   !last_name.length ||
            //   !about.length ||
            //   password.length < 6 ||
            //   confirmPassword.length < 6
            // }
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
