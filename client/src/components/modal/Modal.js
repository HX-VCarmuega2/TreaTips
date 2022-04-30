import React from 'react'
import { Link } from 'react-router-dom';
import './modal.css'
import success from '../../img/recipeCreated.jpg' 


const Modal = ({msg}) => {

    return (
    <div className='modal'>
      <div className='modal__container'>
        <h1 className='modal__title'>Awesome!</h1>
        <img className='modal__image' src={success} alt={msg} />
        <p className='modal__msg' >{msg}</p>
        <div className='modal__link-container'>
          <Link to='/home' className='modal__link'>
            Home
          </Link>
          <Link to='/post' className='modal__link'>
            Create
          </Link>
        </div>
        
      </div>
    </div>
    
  )
}

export default Modal