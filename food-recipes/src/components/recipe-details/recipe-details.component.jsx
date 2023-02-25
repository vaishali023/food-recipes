import React from 'react'
 import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './recipe-details.styles.css';

const Detailpage = () => {
  const {state} = useLocation();
  const API_URL = "https://api.spoonacular.com/recipes/"
  const API_KEY= "apiKey=78d063aa173b4e8c94c8111766337153"
  const[ recipeDetail, setRecipeDetail] = useState([]);
  
  
useEffect(() => {
  getRecipeDetail();
}, []);

 async function getRecipeDetail() {
   let result = await fetch(
     `${API_URL}${state.recipe_id}/information?${API_KEY}`
   );
   let recipeidetail = await result.json();

   const details = recipeidetail;

   setRecipeDetail(details);
 }

return (
<div className='details-container'>
  <h2>{recipeDetail.title}</h2>
  <img src={recipeDetail.image} alt={recipeDetail.title} />
  <p>{recipeDetail.vegan ? 'Vegan' : 'Not vegan'}</p>
  <p>{recipeDetail.dairyFree ? 'Dairy-free' : 'Not dairy-free'}</p>
  
  <h2>Ingredients:</h2>
     <ul>
      {recipeDetail?.extendedIngredients?.map((ingredient) => (
        <li key={ingredient.id}>
          {ingredient.name}: {ingredient.measures.us.amount} {ingredient.measures.us.unitShort}
        </li>
      ))}
    </ul> 
    <h2>Instructions:</h2>
    <ol>
      {recipeDetail?.analyzedInstructions?.[0]?.steps?.map((step) => (
        <li key={step.number}>{step.step}</li>
      ))}
    </ol>
</div>
)
}

export default Detailpage;