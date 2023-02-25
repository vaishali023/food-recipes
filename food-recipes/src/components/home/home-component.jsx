import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './home.styles.css';

const Home = () => {
    const[ recipe,setRecipe ] = useState('');
    const[ recipelist, setRecipelist] = useState([]);
    const [ cuisine, setCuisine] = useState('');
    const [random, setRandomrecipe] =useState([]);
  
    const API_URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=78d063aa173b4e8c94c8111766337153&query=";
    
    const handleRecipe = (event) => {
      setRecipe(event.target.value);
    };
    const handleClick = async () => {
      let result = await fetch(
        `${API_URL}${recipe}&cuisine=${cuisine}&number=5`
      );
      let recipeitems = await result.json();
      const list = recipeitems.results;
      setRecipelist(list);
      setToggle(false);
    };

   
    useEffect(() => {
      randomRecipe();
    }, []);
    async function randomRecipe() {
      let result = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=78d063aa173b4e8c94c8111766337153&number=5`
      );
      let recipe = await result.json();

      setRandomrecipe(recipe.recipes);
    }

    const handleChange = (e) => {
      setCuisine(e.target.value);
    };

    const navigate = useNavigate();

    const recipeDetail = (recipeid) => {
      navigate("/detail", {
        state: {
          recipe_id: recipeid,
        },
      });
    };
    const [toggle, setToggle] = useState(true);


  return (
    <div>
      <h1>Food Recipes</h1>

      <section id="home">
        <div className="home-container">
          <input
            type="text"
            id="recipe"
            name="recipe"
            onChange={handleRecipe}
            value={recipe}
          />
          <label className="searchBox">
            <select onChange={handleChange} className="cuisines">
              <option>Select Cuisine</option>

              <option value="italian">italian</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="African">African</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="Caribbean">Caribbean</option>
              <option value="Chinese">Chinese</option>
              <option value="French">French</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
              <option value="Mexican">Mexican</option>
              <option value="Spanish">Spanish</option>
            </select>
          </label>
          <button onClick={handleClick}>Search</button>
        </div>
        {!toggle ? (
          <ul>
            {recipelist.map((recipe) => (
              <li
                className="recipe-list"
                onClick={() => {
                  recipeDetail(recipe.id);
                }}
                key={recipe.id}
              >
                <div className="recipe-container">
                  <img src={recipe.image} alt={recipe.title} />
                  <h3 className="recipe-title">{recipe.title}</h3>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="random-recipes">
            <ul>
              {random.map((recipe) => (
                <li
                  onClick={() => {
                    recipeDetail(recipe.id);
                  }}
                  className="recipe-list"
                  key={recipe.id}
                >
                  <div className="recipe-container">
                    <img src={recipe.image} alt={recipe.title} />
                    <h3 className="recipe-title">{recipe.title}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
            
}

export default Home;