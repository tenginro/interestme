import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import logo from "../LandingPage/Assets/icon.png";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrors, setShowErrors] = useState({});
  const [resErrors, setResErrors] = useState({});
  const [about, setAbout] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(()=>{
    const err = [];
    if(!email.length || !email.includes('@')) err.push('Invalid email');
    if(!first_name.length ) err.push('First name is required');
    if(!last_name.length) err.push('Last name is required');
    if(!username.length) err.push ('username needs to be at least 4 characters.')
    if(!password.length) err.push('password needs to be at least 6 characters.');
    if(password!==confirmPassword) err.push('Confirm Password field must be the same as the Password field')
    setErrors(err);
  }, [email, first_name, last_name, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setErrors([]);
    setResErrors({});
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(
          username,
          email,
          password,
          first_name,
          last_name,
          about
        )
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
    // if(password===confirmPassword){
    //   dispatch(signUp({ email, username, first_name, last_name, password }))
    //   .then(closeModal)
    //   .catch(async (res) => {
    //       const data = await res.json();
    //       //console.log('catch', data)
    //       if (data && data.errors) {
    //         //console.log('data.errors', data.errors)
    //         setResErrors(data.errors);
    //       }
    //     });
    // } else {
    //   setResErrors(['Confirm Password field must be the same as the Password field'])
    // }

  };
  const SignUpButtonClassName = "SubmitButton" + (!Boolean(Object.values(errors).length) ? "" : " disable");
  return (
    <div className="sign_up_modal">
      <img id="logo" src={logo} alt="Logo" />
      <h1 className="welcome">Welcome to Tinterest</h1>
      <h3>Find new ideas to try</h3>
      <form onSubmit={handleSubmit} className="signUpForm">
        {hasSubmitted && Boolean(Object.values(resErrors).length) ? (
            <li>{Object.values(resErrors)}</li>
          ) : null}
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <div className="inputField">
          <label className="signUpLabel">
            Email
          </label>
          <input
            type="text"
            placeholder="Email is required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* {hasSubmitted ? <p className="error">* {errors.email}</p> : null} */}
        </div>
        <div className="inputField">
          <label>
            Username
          </label>
          <input
            type="text"
            placeholder="Username is required"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {/* {hasSubmitted ? <p className="error">* {errors.username}</p> : null} */}
        </div>
        <div className="inputField">
          <label>
            First Name
          </label>
            <input
              type="text"
              placeholder="First Name is required"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {/* {hasSubmitted ? <p className="error">* {errors.first_name}</p> : null} */}
        </div>
        <div className="inputField">
          <label>
            Last Name
          </label>
            <input
              type="text"
              placeholder="Last Name is required"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {/* {hasSubmitted ? <p className="error">* {errors.last_name}</p> : null} */}
        </div>
        <div className="inputField">
          <label>
            About
          </label>
            <textarea
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />
        </div>
        <div className="inputField">
          <label>
            Password
          </label>
          <input
            type="password"
            placeholder="Password is required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* {hasSubmitted ? <p className="error">* {errors.password}</p> : null} */}
        </div>
        <div className="inputField">
          <label>
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
            {/* {hasSubmitted ? <p className="error">* {errors.confirmPassword}</p> : null} */}
        </div>
        <div className="inputField">
          <button type="submit"
          
          className={SignUpButtonClassName}
          disabled={Boolean(Object.values(errors).length)}
          >Continue</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
