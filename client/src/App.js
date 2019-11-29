import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Profile from "./pages/profile";
import Logout from "./pages/logout";
import Login from "./pages/login";
import Ingredients from "./pages/allLists/ingredient/ingredients";
import CreateIngredient from "./pages/allLists/ingredient/createIngredient";
import UpdateIngredient from "./pages/allLists/ingredient/updateIngredient";
import RecipesList from "./pages/allLists/recipe/recipesList";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/profile" component={Profile} />
      <Route exact path="/ingredient" component={Ingredients} />
      <Route path="/ingredient/create" component={CreateIngredient} />
      <Route path="/ingredient/update/:id" component={UpdateIngredient} />
      <Route exact path="/recipe" component={RecipesList} />
    </Switch>
  );
}

export default App;
