import React from "react";
import IngredientForm from "./ingredientForm";
import IngredientService from "../../../api/ingredientService";

import "./styles.css";

function CreateIngredient(props) {
  const ingredientService = new IngredientService();
  const onSubmitHandles = async body => {
    try {
      const newIngredient = await ingredientService.create(body);
      return newIngredient;
    } catch (err) {
      console.log(err);
    } finally {
      props.history.push("/ingredient");
    }
  };

  return (
    <div className="container">
      <IngredientForm type="create" onSubmit={onSubmitHandles} />
    </div>
  );
}

export default CreateIngredient;
