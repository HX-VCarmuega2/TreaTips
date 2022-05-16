import React from 'react'
import Display from '../display/Display'
import Modal from '../modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import './displayer.css'
import notFoundImg from '../../img/notFound.jpg'
import { getAllRecipes } from '../../redux/actions';


const title = 'Recipe not found'
const msg = 'No recipe matches the words entered. Try other words or create your own recipe'

const Displayer = () => {
  
  const dispatch = useDispatch();
  const error = useSelector((state)=> state.errors.search);
  const recipes = useSelector((state)=> state.recipesToDisplay);
  
  function closeModal(){
    dispatch(getAllRecipes())
  }

  return (
    <div>
      {error.length > 0 ? (
      <Modal title={title} msg={msg} img={notFoundImg} closeModal={closeModal}/>) : (
      <div className={recipes.length > 0 ? 'displayer' : 'hide'}>
            <div>
              <h3 className='displayer__title'>Recipes</h3>
              <div className='displayer__underline'></div>
            </div>
            <div className='displayer__display-container'>
             {recipes.map((recipe)=>{return(
                <Display key={recipe.id} recipe={recipe}/>
              )})}
            </div>
      </div>)}
      
    </div>
    
  )
}

export default Displayer