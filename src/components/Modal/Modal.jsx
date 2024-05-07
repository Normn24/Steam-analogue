import './Modal.scss'

const Modal = ({ children, isModal, modalClose }) => {
  if (isModal) {
    return (
      <div  className='modal' onClick={modalClose}>
        <button data-testid="closeModal" type='button' onClick={modalClose} className='modal__btn-close'>
          &times;
        </button>
        <div className='modal__container' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  }
}

export default Modal
