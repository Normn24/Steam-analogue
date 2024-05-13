import './Modal.scss'

const Modal = ({ children, isModal, modalClose }) => {
  if (isModal) {
    return (
      <div  className='modal' onClick={modalClose}>
        <div className='modal__container' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  }
}

export default Modal
