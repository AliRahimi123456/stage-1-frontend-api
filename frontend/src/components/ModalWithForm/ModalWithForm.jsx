import { useEffect } from "react";
import "../../blocks/ModalWithForm.css";

function ModalWithForm({
  children,

  title,
  isOpen = false,
  onClose,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  });

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>

        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>

        <form onSubmit={handleSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
