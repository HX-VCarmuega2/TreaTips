import React from 'react'
import Display from '../display/Display'


const Displayer = ({recipes}) => {
    
  return (
    recipes.map((recipe)=>{return(
      <Display key={recipe.id} recipe={recipe} />
    )})
  )
}

export default Displayer