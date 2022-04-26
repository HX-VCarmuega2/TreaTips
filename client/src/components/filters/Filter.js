import React, { useState } from 'react'
import { connect } from 'react-redux';
import { orderRecipes, filterRecipes, getAllRecipes } from '../../redux/actions';
import './filter.css'


const Filter = (props) => {
  const [btn, setBtn] = useState({
    alpha: false,
    health: false,
    diets: false
  })

  const diets = [];

  props.recipes.forEach(recipe =>{
    recipe.diets.forEach(diet =>{
      let newDiet = diet.name;
        if(!diets.includes(newDiet)){
          diets.push(newDiet)
        }
    })
  });

  function showBtn(prop){
    setBtn({
      ...btn,
      [prop]: !btn[prop]})
  }

  return (
    <div className='filter' >

      <div className={props.recipes.length > 0? 'filter__order-container' : 'hide' }>
        <div className='filter__order-type'>
          <h4 onClick={()=>showBtn('alpha')}>Order Alphabeticaly</h4>
          <div className='filter__underline'></div>
          <div className={btn.alpha ?'filter__order-btnContainer' : 'hide'}>
            <button className='filter__btn' onClick={()=>props.orderRecipes('A-Z')}>A-Z</button>
            <button className='filter__btn' onClick={()=>props.orderRecipes('Z-A')}>Z-A</button>
          </div>
          
        </div>
        <div className='filter__order-type' >
          <h4 onClick={()=>showBtn('health')}>Order by Health Points</h4>
          <div className='filter__underline'></div>
          <div className={btn.health ?'filter__order-btnContainer' : 'hide'}>
            <button className='filter__btn' onClick={()=>props.orderRecipes('MAX')}>Max</button>
            <button className='filter__btn' onClick={()=>props.orderRecipes('MIN')}>Min</button>
          </div>
        </div>
      </div>
        
      <div className={props.recipes.length>0 ? 'filter__dietsType-container' :'hide' }>
        <h4 onClick={()=>showBtn('diets')}>Filter by Diet</h4>
        <div className='filter__underline'></div>
        <div className={btn.diets ? 'filter__dietsType-LinksContainer' : 'hide'} >
          {diets.map(diet=>{return(
            <button 
              className='filter__dietsType'
              key={diet}
              onClick={()=>props.filterRecipes(diet)}>
                {diet}
            </button>)})}
        </div>
      </div>
        
      <button className='filter__btn seeAll' onClick={props.getAllRecipes}>See all</button>

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
