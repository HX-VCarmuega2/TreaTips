import React from 'react';
import './modal.css'

const Modal = ({msg, title, img, closeModal}) => {

    return (
    <div className='modal'>
      <div className='modal__container'>
        <h1 className='modal__title'>{title}</h1>
        <img className='modal__image' src={img} alt={msg} />
        <p className='modal__msg' >{msg}</p>
        <div className='modal__link-container'>
          <button onClick={closeModal} className='modal__btn'>
            Close
          </button>
        </div>
        
      </div>
    </div>
    
  )
}

export default Modal