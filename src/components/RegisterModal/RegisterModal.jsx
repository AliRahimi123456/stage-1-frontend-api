import { useState } from "react";
import "../../blocks/RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onClose, onRegister, isOpen, onSignUpClick }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid =
    userName.trim() !== "" && email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(onRegister);
    onRegister({ userName, email, password });
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="SignUp"
      buttonText="signUp"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      {/* <label className="modal__label">
        Avatar URL
        <input
        
          className="modal__input"
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label> */}
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
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </label>
      <div className="modal__button-container">
        <button
          type="submit"
          // className="modal__primary-btn"
          className={`modal__primary-btn ${
            !isValid ? "modal__primary-btn_disabled" : ""
          }`}
        >
          Sign Up
        </button>
        <button
          className="modal__secondary-btn"
          type="button"
          onClick={onSignUpClick}
        >
          or Sign In
        </button>
      </div>
    </ModalWithForm>
  );
};
export default RegisterModal;
