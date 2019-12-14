import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Profile from "./pages/profile/profile";
import Login from "./pages/login";
import Ingredients from "./pages/allLists/ingredient/ingredients";
import CreateIngredient from "./pages/allLists/ingredient/createIngredient";
import UpdateIngredient from "./pages/allLists/ingredient/updateIngredient";
import RecipesList from "./pages/allLists/recipe/recipesList";
import RecipePage from "./pages/allLists/recipe/createRecipe/Builder";
import AuthService from "../src/api/authService";
import Header from "./components/main/Header";
import DayPlanPage from "./pages/allLists/dayplans/Builder";

function App() {
  const [user, setUser] = useState(null);
  const authService = new AuthService();

  useEffect(() => {
    const run = async () => {
      try {
        const loggedUser = await authService.isLoggedIn();
        if (loggedUser.username) {
          setUser(loggedUser);
        }
      } catch (err) {
        console.log("You must log in" + err);
      }
    };

    run();
  }, []);

  return (
    <>
      <div className="clippath"></div>
      <div className="clippath-two"></div>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route
          path="/login"
          render={props => <Login user={user} {...props} setUser={setUser} />}
        />
        <Route
          path="/profile"
          render={props => <Profile {...props} user={user} />}
        />
        <Route exact path="/ingredient" component={Ingredients} />
        <Route path="/ingredient/create" component={CreateIngredient} />
        <Route path="/ingredient/update/:id" component={UpdateIngredient} />
        <Route exact path="/recipe" component={RecipesList} />
        <Route path="/recipe/create" component={RecipePage} />
        <Route exact path="/dayplan" component={DayPlanPage} />
      </Switch>
    </>
  );
}

export default App;
