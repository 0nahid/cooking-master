const apiUrl = "https://www.themealdb.com/api/json/v1/1/";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchItems = document.getElementById("searchItems");
const singleProductDetails = document.getElementById("singleProductDetails");

// search button event handler
searchBtn.addEventListener("click", () => {
    searchFoodByName(searchInput.value);
})
// Search by keywords/name/or letter
const searchFoodByName = keyword => {
    if (keyword != "") {
        let url = `${apiUrl}search.php?s=${keyword}`;
        fetch(encodeURI(url))
            .then(data => data.json())
            .then(data => {
                displayFood(data);
            });
    }
}
// Show error if user type null value
const displayFood = data => {
    if (data.meals == null) {
        showError();
    } else {
        searchItems.innerHTML = createFoodItem(data);
    }
}
const showError = () => {
    searchItems.innerHTML = `
    <span class="error-message"> <i class="fas fa-exclamation-triangle "></i> <h1 >No Items Found!</h1> </span>
    
    `;
}
// Create food items
const createFoodItem = data => {
    let meals = data.meals;
    let mealsItem = "";
    meals.forEach(data => {
        mealsItem += `<div class="food-item" onclick="foodDetails(${data.idMeal})">
                <div class="thumbnail">
                    <img src="${data.strMealThumb}"/>
                </div>
                <div class="food-name">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>`;
    });
    return mealsItem;
}
// Show food details on click
const foodDetails = id => {
    let url = `${apiUrl}lookup.php?i=${id}`;
    fetch(encodeURI(url))
        .then(data => data.json())
        .then(data => {
            let item = data.meals[0];
            let ingredients = "";
            for (let i = 1; i <= 6; i++) {
                ingredients += `<li>  <i class="fas fa-check-square"></i> ${item["strIngredient"+i]}</li>`;
            }
            singleProductDetails.innerHTML = `<div id="singleFoodDetails">
              <div class="singleFoodContent">
                <div class="singleFoodBody">
                  <div class="foodDetails">
                    <button id="hideBtn" onclick="hideDetails()"> <i class="fas fa-times"></i> </button>
                    <img src="${item.strMealThumb}" />
                    <div class="details">
                      <h1>${item.strMeal}</h1>
                      <h4>Ingredients</h4>
                      <ul>${ingredients}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
        });
}
// Hide Details
const hideDetails = () => {
    singleProductDetails.innerHTML = "";
}