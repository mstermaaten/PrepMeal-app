import React, { useState, useEffect } from "react";
import IngredientForm from "./ingredientForm";
import IngredientService from "../../../api/ingredientService";
import { Link } from "react-router-dom";

import "./styles.css";

function UpdateIngredient(props) {
  const ingredientService = new IngredientService();
  const [values, setValues] = useState(null);
  const [popup, setPopup] = useState("hide");

  useEffect(() => {
    const getValues = async () => {
      const id = props.match.params.id;
      try {
        const currentIngredient = await ingredientService.getOne(id);
        setValues(currentIngredient);
      } catch (err) {
        console.log(err);
      }
    };

    getValues();
  }, []);

  const onSubmitHandles = async body => {
    try {
      const updatedIngredient = await ingredientService.update(
        props.match.params.id,
        body
      );
      return updatedIngredient;
    } catch (err) {
      console.log(err);
    } finally {
      props.history.push("/ingredient");
    }
  };

  const deleteOnclick = async () => {
    try {
      const deletedIngredient = await ingredientService.delete(
        props.match.params.id
      );
      return deletedIngredient;
    } catch (err) {
      console.log(err);
    } finally {
      props.history.push("/ingredient");
    }
  };

  const showPopUp = () => {
    setPopup("show");
  };

  const hidePopUp = () => {
    setPopup("hide");
  };

  return (
    <div className="container">
      {values ? (
        <IngredientForm
          type="update"
          onSubmit={onSubmitHandles}
          values={values}
        />
      ) : (
        <h2>Loading...</h2>
      )}
      <button onClick={showPopUp}>Delete Ingredient</button>
      {values ? (
        <div className={`${popup}`}>
          <h1>Are you sure you want to delete?</h1>
          <button onClick={hidePopUp}>Noooo</button>
          <button onClick={deleteOnclick}>Yes...</button>
        </div>
      ) : (
        <div className={`${popup}`}>
          <h1>Sorry, you can't delete before loaded</h1>
          <p onClick={hidePopUp}>Hide</p>
        </div>
      )}
      <Link to="/ingredient">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default UpdateIngredient;
