import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Pagination from "../../components/pagination/Pagination";
import Filter from "../../components/filters/Filter";
import Displayer from "../../components/displayer/Displayer";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions";
import Modal from "../../components/modal/Modal";
import error from "../../img/errorConexion.jpg";
import "./homePage.css";

const title = "Ups!";
const msg =
  "It seems we are having technical problems. Please try again in a few minutes";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  const state = useSelector((state) => state);

  return (
    <div className="container">
      <Navbar />
      {state.loading ? (
        <div className="loading__container">
          <h3 className="loading__msg">Loading Recipes...</h3>
        </div>
      ) : state.errors.request ? (
        <Modal
          title={title}
          msg={msg}
          img={error}
          closeModal={() => {
            navigate("/");
          }}
        />
      ) : (
        <div>
          <Filter />
          <Pagination />
          <Displayer />
        </div>
      )}
    </div>
  );
};

export default HomePage;
