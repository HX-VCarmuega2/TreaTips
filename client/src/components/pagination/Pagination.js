import { usePagination } from 'components/customHooks/usePagination'
import React from 'react'
import { useSelector } from 'react-redux'
import './pagination.css'
import { addBtnPaginationClass } from 'utils/utils'

const Pagination = () => {
  const recipes = useSelector(state => state.recipes)
  const {
    buttons,
    currentPage,
    handleClick,
    prevClick,
    nextClick,
  } = usePagination()

    return (
    <div className={recipes.length > 0? 'pagination__container' : 'hide'}>
      <button 
        className='pagination__btn'
        onClick={prevClick}>
          Prev
      </button>
      
      {buttons.map(el=>{return (
        <button 
          key={el} 
          className={addBtnPaginationClass(currentPage,el)}
          onClick={handleClick}>
            {el}
        </button>)})}
      
      <button
        className='pagination__btn' 
        onClick={nextClick}>
          Next
      </button>
    </div> 
    )
}

  export default Pagination