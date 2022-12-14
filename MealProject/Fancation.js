const searchBtn =document.getElementById('search-btn');
const mealList= document.getElementById('meal');
const mealDetialsContent=document.querySelector('.meal-details-content');
const recipeCloseBtn=document.getElementById('receipe-close-btn');



searchBtn.addEventListener('click', getMeallist);
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click',()=>{
    mealDetialsContent.parentElement.classList.remove('showRecipe');
});
 

function getMeallist(){
    
   let searhInputText = document.getElementById('sreach-input').value.trim();
    //  console.log(searhInputText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searhInputText}`).then(response => response.json())
    .then(data=> {
           let html ="";
           if(data.meals){
            data.meals.forEach(meal => {
                html+=`
                <!--   Meal item   -->
                <div class="meal-item" data-id="${meal.idMeal}" >
                     <div class="meal-img">
                     <img src= "${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                     <h3>${meal.strMeal}</h3>
                     <a href="#" class="recipe-btn"> Get Recipe</a>

                        </div>
                            </div>
                `;
            });
           mealList.classList.remove('notFound');
           }else{
           html="Sorry, We didn`t Find any Meal!";
           mealList.classList.add('notFound');

           }
           mealList.innerHTML=html;
        });
 }
 function getMealRecipe(e){
    e.preventDefault();
   if(e.target.classList.contains('recipe-btn')){
    let mealItem=e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then(response => response.json())
    .then(data =>mealRecipeModal(data.meals));
   }
  
 }
 function mealRecipeModal(meal){
    console.log(meal);
    meal=meal[0];
   let html=`<h2 class="recipe-title">${meal.strMeal} </h2>
         <p class="recipe-category Name">${meal.strCategory}</p>
         <div class="recipe-instruct">
         <h3>Instruction</h3>
          <p>
           ${meal.strInstructions}  
         </p>
          </div>
    <div class="recipe-meal-imag">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;
mealDetialsContent.innerHTML= html;
mealDetialsContent.parentElement.classList.add('showRecipe');
 }