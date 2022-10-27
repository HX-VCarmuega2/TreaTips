import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
  orderRecipes,
  filterRecipes,
  getAllRecipes,
  setCurrentPage,
  getAllDiets,
} from "../../redux/actions";
import "./filter.css";

const Filter = (props) => {

  const dispatch = useDispatch();
  const recipes = useSelector(state=>state.recipes)
  const diets = useSelector(state=>state.diets)
  const [btn, setBtn] = useState({
    order: false,
    filter: false,
  });

  function showBtn(prop) {
    setBtn({
      ...btn,
      [prop]: !btn[prop],
    });
  }

  function handleClick(e) {
    if (e.target.name === "order") {
      dispatch(orderRecipes(e.target.value));
      setBtn({
        ...btn,
        [e.target.name]: false,
      });
    } else {
      dispatch(filterRecipes(e.target.value));
      setBtn({
        ...btn,
        [e.target.name]: false,
      });
      dispatch(setCurrentPage(1))
    }
  }

  return (
    <div className="filter">
      <div
        className={
          recipes.length > 0 ? "filter__order-container" : "hide"
        }
      >
        <div className="filter__order-type">
          <div>
            <h4 onClick={() => showBtn("order")}>Order</h4>
            <div className="filter__underline"></div>
          </div>
          <div className={btn.order ? "filter__order-btnContainer" : "hide"}>
            <ul>
              <li>
                <button
                  className="filter__btn"
                  name="order"
                  value="A-Z"
                  onClick={(e) => handleClick(e)}
                >
                  A-Z
                </button>
              </li>
              <li>
                <button
                  className="filter__btn"
                  name="order"
                  value="Z-A"
                  onClick={(e) => handleClick(e)}
                >
                  Z-A
                </button>
              </li>
              <li>
                <button
                  className="filter__btn"
                  name="order"
                  value="MAX"
                  onClick={(e) => handleClick(e)}
                >
                  Max Health Points
                </button>
              </li>
              <li>
                <button
                  className="filter__btn"
                  name="order"
                  value="MIN"
                  onClick={(e) => handleClick(e)}
                >
                  Min Health Points
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className={"filter__order-type"}>
          <h4 onClick={() => showBtn("filter")}>Filter</h4>
          <div className="filter__underline"></div>
          <div className={btn.filter ? "filter__order-btnContainer" : "hide"}>
            <ul>
              {diets.length && diets.map((diet) => {
                return (
                  <li key={diet.id}>
                    <button
                      className="filter__btn"
                      name="filter"
                      value={diet.name}
                      onClick={(e) => handleClick(e)}
                    >
                      {diet.name}
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  className="filter__btn"
                  name="filter"
                  onClick={()=>dispatch(getAllRecipes())}
                >
                  See all
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Filter;
