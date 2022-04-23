import React from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import './detail.css'

// Paso a paso

const Detail = (props) => {
    const {id} = useParams()
    const recipe = props.recipes.find((recipe)=>{return recipe.id === parseInt(id)});
    let directions;

    if(typeof(recipe.directions) ==='string'){
      directions = recipe.directions.split('*')
    } else {
      directions = recipe.directions;
    }
    
  
    return (
    <div>
        <div className='detail__container'>
          <img className='detail__image' src={recipe.image} alt={recipe.name} />
          <h3 className='detail__title'>{recipe.title}</h3>
          <div className='detail__underline'></div>
        </div>
        <div className='detail__summary-container'>
          <h2 className='detail__subtitle'>Summary</h2>
          <p className='detail__summary' dangerouslySetInnerHTML={{__html: recipe.summary}}></p>
        </div>

        <div className='detail__underline'></div>

        <div className='detail__typesPointsContainer'>
          <div className='detail__typesPointsContainer-individual'>
            <h2 className='detail__subtitle'>Diet types</h2>
            <ul>
              {recipe.diets.map((el,idx) =>{return (
                <li key={el.name + idx}>{el.name}</li>
              )})}
            </ul>
          </div>
          <div className='detail__typesPointsContainer-individual'>
            <h2 className='detail__subtitle'>Dish types</h2>
            <ul>
              {recipe.dishTypes ? recipe.dishTypes.map(el =>{return (
                <li key={el}>{el}</li>
              )}) : <li>Dish type not avalible</li>}
            </ul>
          </div>
        </div>

        <div className='detail__underline'></div>

        <div className='detail__typesPointsContainer'>
          <div className='detail__typesPointsContainer-individual'>
            <h2 className='detail__subtitle'>Score</h2>
            <p className='detail__p'>{recipe.score}</p>
          </div>
          <div className='detail__typesPointsContainer-individual'>
            <h2 className='detail__subtitle'>Health Score</h2>
            <p className='detail__p'>{recipe.healthScore}</p>
          </div>
        </div>

        <div className='detail__underline'></div>

        <div className='detail__summary-container'>
        <h2 className='detail__subtitle'>Directions</h2>
        {directions.length > 0 ? directions.map((el,idx) =>{ return (
          <div key={`step${idx+1}`} className={!el.length && 'hide'}>
            <p className='detail__p'>Step {idx+1}:</p>
            <div className='detail__directions-steps' >
              <span >{el}</span>
            </div>
          </div>)}) : (
          <div className='detail__directions-steps'>
            <span>Directions are not avalible</span>
          </div>)}
        </div>
    </div>
  )
}

function mapStateToProps(state){
    return {
      recipes: state.recipesToDisplay
    }; 
  }
  export default connect(mapStateToProps)(Detail)