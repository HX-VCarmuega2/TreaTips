import React, { useState } from 'react'
import { elements } from '../../redux/reducer'
import { displayRecipes } from '../../redux/actions'
import { connect } from 'react-redux';
import './pagination.css'

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
      if(page === 1){
        return;
      } else {
        setCurrentPage(page-1)
        props.displayRecipes(page-1) 
      }
      
    }

    function nextClick(){
      const page = currentPage;
      if(page === pages){
        return
      } else {
        setCurrentPage(page+1)
        props.displayRecipes(page+1) 
      }
      
    }
    function addClass (el){
      if (currentPage<7 && el<7){
        return 'pagination__btn'
      }
      else if (currentPage>6 && el>6){
        return 'pagination__btn'
      }
      else return 'hide'
    }

    return (
    <div className={props.recipes.length > 0? 'pagination__container' : 'hide'}>
      <button 
        className={currentPage === 1? 'hide' :'pagination__btn'}
        onClick={prevClick}>
          Prev
      </button>
      
      {buttons.map(el=>{return (
        <button 
          key={el} 
          className={addClass(el)}
          onClick={e=>handleClick(e)}>
            {el}
        </button>)})}
      
      <button
        className={currentPage === pages ? 'hide' :'pagination__btn'} 
        onClick={nextClick}>
          Next
      </button>
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