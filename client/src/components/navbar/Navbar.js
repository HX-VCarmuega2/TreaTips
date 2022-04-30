import React from 'react'
import { Link } from 'react-router-dom';
import './navbar.css'
import Search from '../search/Search';

const Navbar = () => {
  return (
    <div className='navbar__container'>
      <div className='navbar__container-title'>
        <h2 className='navbar__title'>TreaTips</h2>
        <div className="navbar__underline"></div>
      </div>
      <Search />
      <div className='navbar__container-links'>
        <Link className='navbar__link' to="/home">Home</Link>
        <Link className='navbar__link' to="/post">Create</Link>
      </div>
    </div>
  )
}

export default Navbar