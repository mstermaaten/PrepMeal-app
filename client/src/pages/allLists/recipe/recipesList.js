import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeService from "../../../api/recipeService";
import IngredientService from "../../../api/ingredientService";

const RecipesList = props => {
  const [createdRecipes, setCreatedRecipes] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState(null);
  const recipeService = new RecipeService();
  const ingredientService = new IngredientService();
  const [created, setCreated] = useState("showResult");
  const [liked, setLiked] = useState("hideResult");
  console.log(props.type);
  useEffect(() => {
    const getRecipes = async () => {
      debugger;
      try {
        const recipesResult = await recipeService.getAllCreatedRecipes();
        setCreatedRecipes(recipesResult);
        console.log(recipesResult);
        return recipesResult;
      } catch (err) {
        console.log("oeps somehting whent wrong with getting the recipess");
      }
    };
    const getLikedRecipes = async () => {
      debugger;
      try {
        const likedResult = await recipeService.getAllLikedRecipes();
        if (likedResult) {
          setLikedRecipes(likedResult);
        } else {
          setLikedRecipes([]);
        }
        console.log(likedResult);
        return likedResult;
      } catch (err) {
        console.log("oeps somehting whent wrong with getting the recipess");
      }
    };

    getLikedRecipes();
    getRecipes();
  }, []);

  const onClickCreated = () => {
    setCreated("showResult");
    setLiked("hideResult");
  };

  const onClickLiked = () => {
    setCreated("hideResult");
    setLiked("showResult");
  };

  const CreatedList = () => {
    return (
      <div>
        <ul className="recipe-list">
          {createdRecipes.map((recipe, i) => {
            return (
              <li className="recipe-list-item" key={i}>
                <div>
                  <p className="name">
                    <span>{recipe.name}</span>
                  </p>
                  {recipe.ingredients.map(async (ingredient, i) => {
                    const values = await ingredientService.getOne(
                      ingredient.ingredientId
                    );
                    const p = ingredient.portion;
                    const protein = p * values.protein;
                    const kcal = p * values.kcal;
                    const carbs = p * values.carbs;
                    const fats = p * values.fats;

                    return (
                      <div>
                        <p className="value">
                          <span>{protein}</span>gr
                        </p>
                        <p className="value">
                          <span>{kcal}</span>kcal
                        </p>
                        <p className="value">
                          <span>{carbs}</span>gr
                        </p>
                        <p className="value">
                          <span>{fats}</span>gr
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div>
                  {recipe.ingredients.map(async (ingredient, i) => {
                    const values = await ingredientService.getOne(
                      ingredient.ingredientId
                    );

                    return <p>{values.name}</p>;
                  })}
                </div>
                <Link to={`/recipe/update/${recipe._id}`}>
                  <button>{props.button}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const LikedList = () => {
    return (
      <div>
        <ul className="recipe-list">
          {likedRecipes.map((recipe, i) => {
            return (
              <li className="recipe-list-item" key={i}>
                <div>
                  <p className="name">
                    <span>{recipe.name}</span>
                  </p>
                  {recipe.ingredients.map(async (ingredient, i) => {
                    const values = await ingredientService.getOne(
                      ingredient.ingredientId
                    );
                    const p = ingredient.portion;
                    const protein = p * values.protein;
                    const kcal = p * values.kcal;
                    const carbs = p * values.carbs;
                    const fats = p * values.fats;

                    return (
                      <div>
                        <p className="value">
                          <span>{protein}</span>gr
                        </p>
                        <p className="value">
                          <span>{kcal}</span>kcal
                        </p>
                        <p className="value">
                          <span>{carbs}</span>gr
                        </p>
                        <p className="value">
                          <span>{fats}</span>gr
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div>
                  {recipe.ingredients.map(async (ingredient, i) => {
                    const values = await ingredientService.getOne(
                      ingredient.ingredientId
                    );

                    return <p>{values.name}</p>;
                  })}
                </div>
                <Link to={`/recipe/update/${recipe._id}`}>
                  <button>{props.button}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Recipes</h1>
      <div className="list-container">
        <Link to="/recipe/create">
          <button>Create new recipe</button>
        </Link>
        <div>
          <div>
            <button onClick={onClickCreated}>Created Recipes</button>
            <button onClick={onClickLiked}>Liked Recipes</button>
          </div>
          <div className="list-container">
            {!createdRecipes ? (
              <h1>Loading</h1>
            ) : (
              <div>
                <div className={`${created}`}>
                  <CreatedList type={createdRecipes} button="Edit" />
                </div>
                <div className={`${liked}`}>
                  <LikedList button="Remove" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesList;

// const RecipesList = () => {
//     return (
//       <div>
//         <ul className="recipe-list">
//           {props.type.map((recipe, i) => {
//             return (
//               <li className="recipe-list-item" key={i}>
//                 <div>
//                   <p className="name">
//                     <span>{recipe.name}</span>
//                   </p>
//                   {recipe.ingredients.map(async (ingredient, i) => {
//                     const values = await ingredientService.getOne(
//                       ingredient.ingredientId
//                     );
//                     const p = ingredient.portion;
//                     const protein = p * values.protein;
//                     const kcal = p * values.kcal;
//                     const carbs = p * values.carbs;
//                     const fats = p * values.fats;

//                     return (
//                       <div>
//                         <p className="value">
//                           <span>{protein}</span>gr
//                         </p>
//                         <p className="value">
//                           <span>{kcal}</span>kcal
//                         </p>
//                         <p className="value">
//                           <span>{carbs}</span>gr
//                         </p>
//                         <p className="value">
//                           <span>{fats}</span>gr
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div>
//                   {recipe.ingredients.map(async (ingredient, i) => {
//                     const values = await ingredientService.getOne(
//                       ingredient.ingredientId
//                     );

//                     return <p>{values.name}</p>;
//                   })}
//                 </div>
//                 <Link to={`/recipe/update/${recipe._id}`}>
//                   <button>{props.button}</button>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   };
//   return (
//     <div className="list-container">
//         {!createdRecipes ? (
//           <h1>Loading</h1>
//         ) : (
//       <div className={`${created}`}>
//         <RecipesList type={createdRecipes} button="Edit" />
//       </div>
//       <div className={`${liked}`}>
//         <RecipesList type={likedRecipes} button="Remove" />
//       </div>
//         )}
//     </div>
//   );
