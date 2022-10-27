import React from 'react'
import { elements } from '../../redux/reducer'
import { displayRecipes, setCurrentPage } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import './pagination.css'

const Pagination = () => {

  const dispatch= useDispatch()

  const recipes = useSelector(state => state.recipes)
  // const recipesToDisplay = useSelector(state => state.recipesToDisplay)
  const currentPage = useSelector(state => state.page)
  

    
    const pages = Math.ceil(recipes.length/elements);
    const buttons = [];
    for(let i=1; i<=pages; i++){
        buttons.push(i)
    }

    function handleClick(e){
        const page = parseInt(e.target.innerText);
        dispatch(setCurrentPage(page))
        dispatch(displayRecipes(page))
    }

    function prevClick(){
      const page = currentPage;
      if(page === 1){
        return;
      } else {
        dispatch(setCurrentPage(page-1))
        dispatch(displayRecipes(page-1))
      }
      
    }

    function nextClick(){
      const page = currentPage;
      if(page === pages){
        return
      } else {
        dispatch(setCurrentPage(page+1))
        dispatch(displayRecipes(page+1))
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
    <div className={recipes.length > 0? 'pagination__container' : 'hide'}>
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

  export default Pagination
