import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesById } from "../../redux/actions";
import "./detail.css";
import food from "../../img/food.jpg";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipesById(id));
  }, [dispatch, id]);

  // const recipe = props.recipes.find((recipe)=>{return recipe.id === parseInt(id)});
  const recipe = useSelector((state) => state.recipeDetail);

  let directions;

  if (typeof recipe.directions === "string") {
    if (recipe.directions.length > 0) {
      directions = recipe.directions.split(",");
    } else {
      directions = [];
    }
  } else {
    directions = recipe.directions;
  }

  return (
    <div>
      {recipe.id ? (
        <div className="detail">
          <div className="detail__titleImgSummary-container boxShadow">
            <div className="detail__container">
              <img
                className="detail__image"
                src={recipe.image ? recipe.image : food}
                alt={recipe.name}
              />
              <div>
                <h3 className="detail__title">{recipe.title}</h3>
                <div className="detail__underline"></div>
              </div>
            </div>
            <div className="detail__summary-container">
              <h2 className="detail__subtitle">Summary</h2>
              <p
                className="detail__summary"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              ></p>
            </div>
          </div>

          <div className="detail__underline"></div>

          <div className="detail__extrainfo-container boxShadow">
            <div className="detail__typesPointsContainer">
              <div className="detail__typesPointsContainer-individual">
                <h2 className="detail__subtitle">Diet types</h2>
                <ul>
                  {recipe.diets ? (
                    recipe.diets.map((el, idx) => {
                      return <li key={el.name + idx}>{el.name}</li>;
                    })
                  ) : (
                    <li>Diets type not avalible</li>
                  )}
                </ul>
              </div>
              <div className="detail__typesPointsContainer-individual">
                <h2 className="detail__subtitle">Dish types</h2>
                <ul>
                  {recipe.dishTypes ? (
                    recipe.dishTypes.map((el) => {
                      return <li key={el}>{el}</li>;
                    })
                  ) : (
                    <li>Dish type not avalible</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="detail__typesPointsContainer">
              <div className="detail__typesPointsContainer-individual">
                <h2 className="detail__subtitle">Score</h2>
                <p className="detail__p">{recipe.score || 'Score not avalible'}</p>
              </div>
              <div className="detail__typesPointsContainer-individual">
                <h2 className="detail__subtitle">Health Score</h2>
                <p className="detail__p">{recipe.healthScore || 'Health Score not avalible'}</p>
              </div>
            </div>
          </div>

          <div className="detail__underline"></div>

          <div className="detail__directions-container boxShadow">
            <h2 className="detail__subtitle">Directions</h2>
            {directions.length > 1 ? (
              directions.map((el, idx) => {
                return (
                  <div key={`step${idx + 1}`}>
                    <p className="detail__p">Step {idx + 1}:</p>
                    <div className="detail__directions-steps">
                      <span>{el}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="detail__directions-steps">
                <span>Directions are not avalible</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loading__container">
          <h3 className="loading__msg">Loading Recipe...</h3>
        </div>
      )}
    </div>
  );
};

export default Detail;
