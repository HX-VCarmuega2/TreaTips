import { elements } from '../../redux/reducer'
import { displayRecipes, setCurrentPage } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

export const usePagination = ()=>{
    const dispatch= useDispatch()
    const recipes = useSelector(state => state.recipes)
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

    return {
      buttons,
      currentPage,
      handleClick,
      prevClick,
      nextClick,
    }
}