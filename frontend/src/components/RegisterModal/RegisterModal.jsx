import { useState } from "react";
import "../../blocks/RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onClose, onRegister, isOpen, onLogInClick }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid =
    username.trim() !== "" && email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(onRegister);
    onRegister({ username, email, password });
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="SignUp"
      buttonText="signUp"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          text="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        UserName
        <input
          className="modal__input"
          type="name"
          placeholder="UserName"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </label>
      <div className="modal__button-container">
        <button
          type="submit"
          className={`modal__primary-btn ${
            !isValid ? "modal__primary-btn_disabled" : ""
          }`}
        >
          Sign Up
        </button>
        <button
          className="modal__secondary-btn"
          type="button"
          onClick={onLogInClick}
        >
          or Sign In
        </button>
      </div>
    </ModalWithForm>
  );
};
export default RegisterModal;
