import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Pagination from '../../components/pagination/Pagination';
import Filter from '../../components/filters/Filter';
import Displayer from '../../components/displayer/Displayer';
import { connect } from 'react-redux';
import Modal from '../../components/modal/Modal';
import error from '../../img/errorConexion.jpg';
import './homePage.css'


const title = 'Ups!'
const msg = 'It seems we are having technical problems. Please try again in a few minutes'

const HomePage = (props) => {

  const navigate = useNavigate()
  


  return (
    <div>
        <Navbar />
        {props.loading ? (
          <div className='loading__container'>
            <h3 className='loading__msg'>Loading Recipes...</h3>
          </div>) : (props.error ? (
            <Modal title={title} msg={msg} img={error} closeModal={()=>navigate('/')} />):
          <div>
            <Filter />
            <Pagination />
            <Displayer />
          </div>
           )}
    </div>
  )
}

function mapStateToProps(state){
  return {
    loading: state.loading,
    error: state.errors.request
  }; 
}
export default connect(mapStateToProps)(HomePage)