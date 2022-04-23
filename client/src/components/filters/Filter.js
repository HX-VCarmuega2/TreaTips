import React from 'react'
import { connect } from 'react-redux';
import { orderRecipes, filterRecipes, getAllRecipes } from '../../redux/actions';

const Filter = (props) => {
  const diets = [];

  props.recipes.forEach(recipe =>{
    recipe.diets.forEach(diet =>{
      let newDiet = diet.name;
        if(!diets.includes(newDiet)){
          diets.push(newDiet)
        }
    })
  });

  return (
    
    <div>
      <div>
        <div>
          <h4>Order Alphabeticaly</h4>
          <button onClick={()=>props.orderRecipes('A-Z')}>A-Z</button>
          <button onClick={()=>props.orderRecipes('Z-A')}>Z-A</button>
        </div>
        <div>
          <h4>Order by Health Points</h4>
          <button onClick={()=>props.orderRecipes('MAX')}>Max</button>
          <button onClick={()=>props.orderRecipes('MIN')}>Min</button>
        </div>
        <div>
          <h4>Filter by Diet</h4>
          {diets.map(diet=>{return(
            <button 
            key={diet}
            onClick={()=>props.filterRecipes(`${diet}`)}>
              {diet}
            </button>)})}
        </div>
        <button onClick={props.getAllRecipes}>See all</button>
      </div>
    </div>
  )
}

function mapStateToProps(state){
  return {
    recipes: state.recipes
  }; 
}

function mapDispatchToProps(dispatch){
  return {
      orderRecipes: (way)=> dispatch(orderRecipes(way)),
      filterRecipes: (diet)=> dispatch(filterRecipes(diet)),
      getAllRecipes: ()=> dispatch(getAllRecipes())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter)
