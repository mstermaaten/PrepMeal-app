import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Profile from "./pages/profile/profile";
import Login from "./pages/login";
import Register from "./pages/Register";
import Ingredients from "./pages/allLists/ingredient/ingredients";
import CreateIngredient from "./pages/allLists/ingredient/createIngredient";
import UpdateIngredient from "./pages/allLists/ingredient/updateIngredient";
import RecipesList from "./pages/allLists/recipe/recipesList";
import RecipePage from "./pages/allLists/recipe/createRecipe/Builder";
import AuthService from "../src/api/authService";
import Header from "./components/main/Header";
import DayPlanPage from "./pages/allLists/dayplans/Builder";
import DaylanList from "./pages/allLists/dayplans/show/Dayplans";
import Explore from "./pages/explore/Explore";
import AllUsersPage from "./pages/explore/exploreComp/AllUsersPage";
import UserProfile from "./pages/explore/UserProfile";

function App() {
  const [user, setUser] = useState(null);
  const authService = new AuthService();

  useEffect(() => {
    const run = async () => {
      try {
        const loggedUser = await authService.getCurrent();
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
          path="/register"
          render={props => (
            <Register user={user} {...props} setUser={setUser} />
          )}
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
        <Route exact path="/dayplan" component={DaylanList} />
        <Route path="/dayplan/create" component={DayPlanPage} />
        <Route
          exact
          path="/explore"
          render={props => <Explore {...props} user={user} />}
        />
        <Route path="/explore/users" component={AllUsersPage} />
        <Route
          path="/explore/user/:id"
          render={props => <UserProfile {...props} user={user} />}
        />
      </Switch>
    </>
  );
}

export default App;
