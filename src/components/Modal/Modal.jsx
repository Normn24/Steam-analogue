import "./Modal.scss";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen ? (
        <div className="modal-overlay" onClick={onClose}>
          <div className="Modal" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
