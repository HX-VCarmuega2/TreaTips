import React, { useState } from 'react'
import Display from '../display/Display'
import Modal from '../modal/Modal';
import { connect } from 'react-redux';
import './displayer.css'
import notFoundImg from '../../img/notFound.jpg'


const title = 'Recipe not found'
const msg = 'No recipe matches the words entered. Try other words or create your own recipe'

const Displayer = (props) => {
  const [modal,setModal] = useState(true)
  
  function closeModal(){
    setModal(false)
  }

  return (
    <div>
      {props.error && modal ? (
      <Modal title={title} msg={msg} img={notFoundImg} closeModal={closeModal}/>) : (
      <div className={props.recipes.length > 0 ? 'displayer' : 'hide'}>
            <div>
              <h3 className='displayer__title'>Recipes</h3>
              <div className='displayer__underline'></div>
            </div>
            <div className='displayer__display-container'>
              {props.recipes.map((recipe)=>{return(
                <Display key={recipe.id} recipe={recipe}/>
              )})}
            </div>
      </div>)}
      
    </div>
    
  )
}

function mapStateToProps(state){
  return {
    recipes: state.recipesToDisplay,
    error: state.errors.search
  }; 
}
export default connect(mapStateToProps)(Displayer)