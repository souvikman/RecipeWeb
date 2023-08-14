const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const response = await data.json();
      recipeContainer.innerHTML = "";
      response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <p><span>${meal.strArea}</span> Dish</p>
          <p><span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button')
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click', ()=>{
          openRecipePopup(meal);
        })
        
        recipeContainer.appendChild(recipeDiv);
      });
    }
    catch (error) {
      recipeContainer.innerHTML = "<h2>No results found for your search...</h2>"
    } 
     //console.log(response.meals);
}

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}


const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        
        <div class="recipeInstructions">
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
        </div>
    `
     
    recipeDetailsContent.parentElement.style.display ="block";
}

recipeCloseBtn.addEventListener('click', ()=> {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('.searchBox input');
    const searchTerm = searchInput.value.trim();
    if (!searchTerm){
      recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
      return;
    }
    fetchRecipes(searchTerm);
    //console.log("Button Clicked");
});

// searchInput = searchTerm
// Function to handle the recipe search form submission
/*function handleSearch(event) {
    event.preventDefault(); // Prevents the form from submitting and refreshing the page
    
    const searchInput = document.querySelector('.searchBox input');
    const searchTerm = searchInput.value.trim();
  
    if (searchTerm !== '') {
      searchRecipes(searchTerm);
    }
    
    searchInput.value = ''; // Clear the input field
  }
  
  // Function to search recipes based on the name
  function searchRecipes(name) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  
    // Make an HTTP GET request to the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Handle the API response data
        displayRecipes(data.meals);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Function to display the searched recipes on the webpage
  function displayRecipes(recipes) {
    const recipeContainer = document.querySelector('.recipe-container');
    recipeContainer.innerHTML = ''; // Clear any previous results
    
    if (recipes) {
      recipes.forEach(recipe => {
        const recipeName = recipe.strMeal;
        const recipeImage = recipe.strMealThumb;
        const recipeArea = recipe.strArea;
        const recipeCategory = recipe.strCategory;
  
        // Create HTML elements to display recipe name and image
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
  
        const nameElement = document.createElement('h3');
        nameElement.textContent = recipeName;
  
        const imageElement = document.createElement('img');
        imageElement.src = recipeImage;
        imageElement.alt = recipeName;
        imageElement.alt = recipeArea;
        imageElement.alt = recipeCategory;
  
        // Append elements to the recipe container
        recipeDiv.appendChild(nameElement);
        recipeDiv.appendChild(imageElement);
        recipeContainer.appendChild(recipeDiv);

      });
    } else {
      // Display a message if no recipes were found
      const noResultsElement = document.createElement('p');
      noResultsElement.textContent = 'No recipes found.';
      recipeContainer.appendChild(noResultsElement);
    }
  }
  
  // Event listener for the recipe search form submission
  const searchForm = document.querySelector('.searchBox');
  searchForm.addEventListener('submit', handleSearch);
  
  // Function to handle the recipe search form submission
function handleSearch(event) {
  event.preventDefault(); // Prevents the form from submitting and refreshing the page
  
  const searchInput = document.querySelector('.searchBox input');
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    searchRecipes(searchTerm);
  }
  
  searchInput.value = ''; // Clear the input field
}

// Function to search recipes based on the name
function searchRecipes(name) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  // Make an HTTP GET request to the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Handle the API response data
      displayRecipes(data.meals);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
*/
/*
// Function to display the searched recipes on the webpage
function displayRecipes(recipes) {
  const recipeContainer = document.querySelector('.recipe-container');
  recipeContainer.innerHTML = ''; // Clear any previous results
  
  if (recipes) {
    recipes.forEach(recipe => {
      const recipeName = recipe.strMeal;
      const recipeImage = recipe.strMealThumb;

      // Create HTML elements to display recipe name and image
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');

      const nameElement = document.createElement('h3');
      nameElement.textContent = recipeName;

      const imageElement = document.createElement('img');
      imageElement.src = recipeImage;
      imageElement.alt = recipeName;

      // Append elements to the recipe container
      recipeDiv.appendChild(nameElement);
      recipeDiv.appendChild(imageElement);
      recipeContainer.appendChild(recipeDiv);
    });
  } else {
    // Display a message if no recipes were found
    const noResultsElement = document.createElement('p');
    noResultsElement.textContent = 'No recipes found.';
    recipeContainer.appendChild(noResultsElement);
  }
}

// Event listener for the recipe search form submission
const searchForm = document.querySelector('.searchBox');
searchForm.addEventListener('submit', handleSearch);
*/
/*
const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p><span>${meal.strCategory}</span> Category</p>
        `;
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <p>${meal.strInstructions}</p>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
}

searchBtn.addEventListener('click', () => {
    const searchInput = document.querySelector('.searchBox input');
    const searchTerm = searchInput.value.trim();
    fetchRecipes(searchTerm);
});
*/