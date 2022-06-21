import React, { useEffect, useState } from "react";
import { diets } from "../../redux/reducer";
import "./form.css";
import { validateInput } from "./validation";
import { URL } from "../../redux/actions";
import axios from "axios";
import Modal from "../modal/Modal";
import success from "../../img/recipeCreated.jpg";

const Form = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    score: 0,
    healthScore: 0,
    directions: [{ step: "" }],
    diets: [],
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      axios
        .post(URL, recipe)
        .then(function (response) {
          setResult(response.data.msg);
        })
        .catch(function (error) {
          setResult(error);
        });

      setModal(true);

      setRecipe({
        title: "",
        summary: "",
        score: 0,
        healthScore: 0,
        directions: [{ step: "" }],
        diets: [],
      });

      e.target.reset();
    }
  }

  function handleChange(e) {
    if (e.target.type === "checkbox") {
      if (recipe.diets.includes(e.target.name)) {
        setRecipe({
          ...recipe,
          diets: recipe.diets.filter((diet) => {
            return diet !== e.target.name;
          }),
        });
      } else {
        setRecipe({ ...recipe, diets: recipe.diets.concat(e.target.name) });
      }
    } else {
      setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }
  }

  function handleDirectionChange(e) {
    const { name, value, id } = e.target;
    const newDirections = [...recipe.directions];
    newDirections[id][name] = value;
    setRecipe({ ...recipe, newDirections });
  }

  function addTextarea(e) {
    e.preventDefault();
    setRecipe({
      ...recipe,
      directions: recipe.directions.concat({ step: "" }),
    });
  }
  function removeStep(e) {
    e.preventDefault();
    const { id } = e.target;
    const reDirections = [...recipe.directions];
    reDirections.splice(id, 1);
    setRecipe({ ...recipe, directions: reDirections });
  }

  function stringifyDirections(e) {
    e.preventDefault();
    let stringDirections = recipe.directions
      .map((element) => {
        return element.step;
      })
      .toString();
    setRecipe({ ...recipe, directions: stringDirections });
  }

  function closeModal() {
    setModal(false);
    setResult([]);
  }

  useEffect(() => {
    setErrors(validateInput(recipe));
  }, [recipe]);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h3 className="form__title">New Recipe</h3>

      <div className="form__container shadow">
        <label className="form__label">Recipe name:</label>
        <input
          className={
            errors.title
              ? "form__recipeTitle-input error "
              : "form__recipeTitle-input"
          }
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
          placeholder="Write down recipe name"
        />
        {errors.title && (
          <span className="form__msgErrors">{errors.title}</span>
        )}
      </div>

      <div className="form__container shadow">
        <label className="form__label">Summary:</label>
        <textarea
          className={
            errors.summary
              ? "form__recipeSummary-input error"
              : "form__recipeSummary-input"
          }
          name="summary"
          value={recipe.summary}
          onChange={handleChange}
          cols="10"
          rows="10"
        ></textarea>
        {errors.summary && (
          <span className="form__msgErrors">{errors.summary}</span>
        )}
      </div>

      <div className="form__score-container shadow">
        <div className="form__score-container column">
          <div className="form__score-container">
            <label>Score:</label>
            <input
              className={
                errors.score ? "form__input-number error" : "form__input-number"
              }
              type="number"
              name="score"
              value={recipe.score}
              onChange={handleChange}
            />
          </div>
          {errors.score && (
            <span className="form__msgErrors align">{errors.score}</span>
          )}
        </div>

        <div className="form__score-container column">
          <div className="form__score-container">
            <label>Health Score:</label>
            <input
              className={
                errors.healthScore
                  ? "form__input-number error"
                  : "form__input-number"
              }
              type="number"
              name="healthScore"
              value={recipe.healthScore}
              onChange={handleChange}
            />
          </div>
          {errors.healthScore && (
            <span className="form__msgErrors align">{errors.healthScore}</span>
          )}
        </div>
      </div>

      <div className="form__container shadow">
        <label className="form__label">Directions:</label>

        {Array.isArray(recipe.directions) ? (
          recipe.directions.map((ele, idx) => (
            <div className="form__container" key={`div${idx}`}>
              <textarea
                className="form__recipeSummary-input"
                name="step"
                value={ele.step}
                id={idx}
                onChange={handleDirectionChange}
                placeholder={`step ${
                  idx + 1
                }: To improve the performance of the site, please avoid using commas when entering directions`}
                cols="10"
                rows="5"
              ></textarea>
              <button
                className="form__directions-deleteBtn"
                id={idx}
                onClick={removeStep}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="form__SaveDirections-msg">Directions save</div>
        )}
        <div className="form__AddSaveBtn-container">
          {Array.isArray(recipe.directions) && recipe.directions.length < 6 && (
            <button className="form__directions-addBtn" onClick={addTextarea}>
              Add step
            </button>
          )}
          {Array.isArray(recipe.directions) && (
            <button
              onClick={stringifyDirections}
              className="form__directions-save"
            >
              Save
            </button>
          )}
          {errors.directions && (
            <span className="form__msgErrors">{errors.directions}</span>
          )}
        </div>
      </div>

      <div className="form__container shadow">
        <label className="form__label">Select the diet type:</label>
        {errors.diets && (
          <span className="form__msgErrors">{errors.diets}</span>
        )}
        <div className="form__container">
          {diets.map((diet, idx) => {
            return (
              <div key={idx} className="form__checkbox">
                <label >{diet}</label>
                <input
                  name={diet}
                  type="checkbox"
                  value={recipe.diets}
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </div>
      </div>

      <input
        value="Create"
        className={
          Object.keys(errors).length > 0 ? "form__btn ghost" : "form__btn"
        }
        type="submit"
      />
      {modal && (
        <Modal
          title="Awesome!"
          msg={result}
          img={success}
          closeModal={closeModal}
        />
      )}
    </form>
  );
};

export default Form;
