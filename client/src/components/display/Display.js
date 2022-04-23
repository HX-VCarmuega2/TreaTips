import React from 'react'
import { Link } from 'react-router-dom';

const Display = ({recipe}) => {
  const {title,image,diets,id } = recipe;
  
    return (
    <div>
        <h3>{title}</h3>
        <img src={image} alt={title} />
        {diets.map((diet,idx)=>{return(
        <li key={idx}>{diet.name}</li>)}
        )}
        <Link to={`/recipe/${id}`}>
          <p>Reed more</p>
        </Link>
    </div>
  )
}

export default Display