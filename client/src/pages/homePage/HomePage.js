import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Pagination from '../../components/pagination/Pagination';
import Filter from '../../components/filters/Filter';
import Displayer from '../../components/displayer/Displayer';

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Filter />
        <Pagination />
        <Displayer />
    </div>
  )
}

export default HomePage