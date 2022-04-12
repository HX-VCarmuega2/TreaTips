import React from 'react'

const Display = ({recipe}) => {
  const {title,image,diets} = recipe;
    return (
    <div>
        <h3>{title}</h3>
        <img src={image} alt={title} />
        {diets.map((diet,idx)=>{return(
        <li key={idx}>{diet}</li>)}
        )}
    </div>
  )
}

export default Display