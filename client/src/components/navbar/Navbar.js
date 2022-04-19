import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './navbar.css'
import lupa from '../../img/lupa.png';
import { getRecipesByName } from '../../redux/actions';


const Navbar = (props) => {
  const [word,setWord] = useState('');

  const handleSubmit = ()=>{
    props.getRecipesByName(word)
    setWord("")
  }

  return (
    <div className='navbar__container'>
      <div className='navbar__container-title'>
        <h2 className='navbar__title'>TreaTips</h2>
        <div className="navbar__underline"></div>
      </div>
      <div className='navbar__search'>
        <input
          type="text" 
          value={word}
          placeholder='e.g: chicken wings' 
          onChange={(e)=>setWord(e.target.value)} />
        <button 
          type='submit' 
          onClick={handleSubmit}>
            <img src={lupa} alt="search button"/>
        </button>
      </div>
        
      <div className='navbar__container-links'>
        <Link className='navbar__link' to="/home">Home</Link>
        <Link className='navbar__link' to="/post">Create</Link>
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return {
    getRecipesByName:(word)=> dispatch(getRecipesByName(word))
  }
}

export default connect(null,mapDispatchToProps)(Navbar)