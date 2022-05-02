import React, { useState }from 'react'
import '../navbar/navbar.css'
import { connect } from 'react-redux';
import { getRecipesByName } from '../../redux/actions';
import lupa from '../../img/lupa.png';
import { useNavigate } from 'react-router-dom';

const Search = (props) => {
    const [word,setWord] = useState('');
    const navigate = useNavigate()

    const handleSubmit = ()=>{
    props.getRecipesByName(word)
    setWord("")
    navigate('/home')
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

function mapDispatchToProps(dispatch){
    return {
      getRecipesByName:(word)=> dispatch(getRecipesByName(word))
    }
  }
  
  export default connect(null,mapDispatchToProps)(Search)