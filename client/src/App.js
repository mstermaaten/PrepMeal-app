import React, { useState, useEffect } from "react";
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
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const authService = new AuthService();

  useEffect(() => {
    const run = async () => {
      debugger;
      const loggedUser = await authService.getCurrent();
      setUser(loggedUser);
      setUserLoading(false);
    };

    run();
  }, []);

  return (
    <>
      <div className="clippath"></div>
      <div className="clippath-two"></div>
      {!userLoading && <Header user={user} setUser={setUser} />}
      <Switch>
        <Route path="/landing" component={Landing} />
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
        {!userLoading && (
          <Route
            exact
            path="/"
            render={props => <Profile {...props} user={user} />}
          />
        )}
        <Route exact path="/ingredient" component={Ingredients} />
        <Route path="/ingredient/create" component={CreateIngredient} />
        <Route path="/ingredient/update/:id" component={UpdateIngredient} />
        <Route exact path="/recipe" component={RecipesList} />
        <Route path="/recipe/create" component={RecipePage} />
        <Route path="/recipe/update/:id" component={RecipePage} />

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
