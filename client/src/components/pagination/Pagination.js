import React, { useState } from 'react'
import { elements } from '../../redux/reducer'
import { displayRecipes } from '../../redux/actions'
import { connect } from 'react-redux';

//Decidir que hacer cuando el current page es negativo o supera la longitud del arreglo.

const Pagination = (props) => {
    const [currentPage,setCurrentPage] = useState(1)
    
    const pages = Math.ceil(props.recipes.length/elements);
    const buttons = [];
    for(let i=1; i<=pages; i++){
        buttons.push(i)
    }

    function handleClick(e){
        const page = parseInt(e.target.innerText);
        setCurrentPage(page)
        props.displayRecipes(page)
    }

    function prevClick(){
      const page = currentPage;
      setCurrentPage(page-1)
      props.displayRecipes(page-1) 
    }

    function nextClick(){
      const page = currentPage;
      setCurrentPage(page+1)
      props.displayRecipes(page+1) 
    }

    return (
    <div>
      <button onClick={prevClick}>Prev</button>
        {buttons.map(el=>{return <button key={el} onClick={e=>handleClick(e)}>{el}</button>})}
      <button onClick={nextClick}>Next</button>
    </div> 
    )
}

function mapStateToProps(state){
    return {
      recipes: state.recipes,
      recipesToDisplay: state.recipesToDisplay
    }; 
  }
function mapDispatchToProps(dispatch){
    return {
        displayRecipes: (page)=> dispatch(displayRecipes(page))
    }
}
  export default connect(mapStateToProps,mapDispatchToProps)(Pagination)