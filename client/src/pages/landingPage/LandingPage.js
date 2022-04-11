import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css'

function LandingPage() {
  return (
    <div className='landing__fondo'>
        <div className='landing__contenedor'>
            <h1 className='landing__title'>TreaTips</h1>
            <div className="landing__underline"></div>
            <div className='landing__description'>
                <h3>Take care of yourself</h3>
                <p>Healthy and delicious dishes at a click</p>
            </div>
            <Link to="/home">
                <button className='landing__btn' type="submit"
                // onClick={()=>{props.getAllCharacter()}}
                >Get Started
                </button>
            </Link>
        </div>
    </div>
  )
}

export default LandingPage