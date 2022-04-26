import React from 'react'
import Display from '../display/Display'
import { connect } from 'react-redux';
import './displayer.css'


const Displayer = (props) => {
    
  return (
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
  </div>
  )
}

function mapStateToProps(state){
  return {
    recipes: state.recipesToDisplay
  }; 
}
export default connect(mapStateToProps)(Displayer)