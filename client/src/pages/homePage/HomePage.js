import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { connect } from 'react-redux';
import Displayer from '../../components/displayer/Displayer';

const HomePage = (props) => {
  return (
    <div>
        <Navbar />
        <Displayer />
    </div>
  )
}

function mapStateToProps(state){
  return {
    recipes: state.recipes,
  };
  
}
export default connect(mapStateToProps)(HomePage)