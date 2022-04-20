import React from 'react'
import Display from '../display/Display'
import { connect } from 'react-redux';


const Displayer = (props) => {
    
  return (
    props.recipes.map((recipe)=>{return(
      <Display key={recipe.id} recipe={recipe} />
    )})
  )
}
function mapStateToProps(state){
  return {
    recipes: state.recipesToDisplay
  }; 
}
export default connect(mapStateToProps)(Displayer)