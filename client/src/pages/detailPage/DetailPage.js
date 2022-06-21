import React from "react";
import Detail from "../../components/detail/Detail";
import Navbar from "../../components/navbar/Navbar";
import "./detailPage.css";

const DetailPage = () => {
  return (
    <div className="container">
      <Navbar />
      <Detail />
    </div>
  );
};

export default DetailPage;
