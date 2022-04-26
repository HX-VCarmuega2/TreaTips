import React from 'react'
import { Link } from 'react-router-dom';
import './display.css';
import food from '../../img/food.jpg'

const Display = ({recipe}) => {
  const {title,image,diets,id } = recipe;
  
    return (
    <div className='recipe__container'>
        <img className='recipe__image' src={image ? image : food} alt={title} />
        <h3 className='recipe__title'>{title}</h3>
        <div className='recipe__underline'></div>
        <div className='recipe__container-dietsType'>
          {diets.map((diet,idx)=>{return(
          <li className='recipe__dietType' key={idx}>{diet.name}</li>)}
          )}
        </div>
        <Link className='recipe__link' to={`/recipe/${id}`}>
          <p>Reed more</p>
        </Link>
    </div>
  )
}

export default Display