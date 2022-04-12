import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { connect } from 'react-redux';

const HomePage = (props) => {
  return (
    <div>
        <Navbar />
        {console.log(props.recipes)}
    </div>
  )
}

function mapStateToProps(state){
  return {
    recipes: state.recipes,
  };
  
}
export default connect(mapStateToProps)(HomePage)