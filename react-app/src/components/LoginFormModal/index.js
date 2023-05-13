import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

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
        closeModal()
    }
  };

  const handleDemoClick = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("juice_wrld@gmail.com", "password"));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="login-h1">Log in to Spotify</h1>
      <form onSubmit={handleSubmit}>
        <ul className="login-ul">
          {errors.map((error, idx) => (
            <li className="login-li" key={idx}>{error}</li>
          ))}
        </ul>
        <label className="login-label">
          Email
          <input
          className="login-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        <label className="login-label">
          Password
          <input
          className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <div className="login-buttons-container">
        <button className="login-button" type="submit">Log In</button>
        <button onClick={handleDemoClick} className="login-button">
          {" "}
          Log in as Demo User
        </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
