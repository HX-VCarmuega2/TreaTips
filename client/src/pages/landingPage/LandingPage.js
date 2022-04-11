import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRecipes } from '../../redux/actions'
import './landingPage.css'

function LandingPage(props) {
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
                onClick={()=>{props.getAllRecipes()}}
                >Get Started
                </button>
            </Link>
        </div>
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return {
    getAllRecipes:()=> dispatch(getAllRecipes())
  }
}

export default connect(null,mapDispatchToProps)(LandingPage)