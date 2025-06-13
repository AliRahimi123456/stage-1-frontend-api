function RegisterSuccessModal({ onClose, isOpen, onSignUpClick }) {
  console.log(isOpen);
  return (
    <>
      <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
        <div className="modal__content">
          <h2 className="modal__title">Registration Successfully Completed!</h2>
          <button
            onClick={onClose}
            type="button"
            className="modal__close"
          ></button>
          <button
            className="modal__signin_btn"
            type="button"
            onClick={onSignUpClick}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}
export default RegisterSuccessModal;
