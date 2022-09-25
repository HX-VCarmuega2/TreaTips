import React, { useState }from 'react'
import '../navbar/navbar.css'
import { useDispatch } from 'react-redux'
import { getRecipesByName, setCurrentPage } from '../../redux/actions';
import lupa from '../../img/lupa.png';

const Search = (props) => {
  const dispatch = useDispatch()
    const [word,setWord] = useState('');

    const handleSubmit = ()=>{
    dispatch(getRecipesByName(word))
    setWord("")
    dispatch(setCurrentPage(1))
  }

  return (
    <div className='navbar__search'>
        <input
          type="text" 
          value={word}
          placeholder='e.g: chicken wings' 
          onChange={(e)=>setWord(e.target.value)} />
        <button 
          type='submit' 
          onClick={handleSubmit}>
            <img src={lupa} alt="search button"/>
        </button>
      </div>
  )
}
  
  export default Search