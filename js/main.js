var data = [];
getRecips('pizza');

var links=document.querySelectorAll('.navbar .nav-link');
for(var i=0;i<links.length;i++){
  links[i].addEventListener('click',function(e){
   getRecips(e.target.text);
  })
}



function getRecips(meal) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open(
    "Get",
    `https://forkify-api.herokuapp.com/api/search?q=${meal}`
  );
  httpRequest.send();

  httpRequest.addEventListener("readystatechange", function () {
    if (httpRequest.readyState == 4) {
      data = JSON.parse(httpRequest.response).recipes;
      display();
    }
  });
}



function display(){
  var box=``;
  for(var i=0;i<data.length;i++)
  {
      box+=`
      <div class="col-md-3 my-3">
      <div class="recipe">
           <img src=${data[i].image_url} class='w-100 recipe-img'>
           <h5 class='my-2'>${data[i].title}</h5>
           <a href=${data[i].source_url} target="_blank"  class="btn btn-info text-white">Source</a>
           <button onclick='getRecipesDetails(${data[i].recipe_id})' data-bs-toggle="modal" data-bs-target="#exampleModal" class='btn btn-warning text-white'>Details</button>
      </div>
  </div>
      `
  }
  document.getElementById('rowData').innerHTML=box;
}


async function getRecipesDetails(recipeId)
{
    var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
    recipeDetails=await response.json();
    var recipeDetails=recipeDetails.recipe;
    var recipe=
    `
    <img class="w-100 py-3 recipesStyle " src="${recipeDetails.image_url}" id="img">
<h3>${recipeDetails.publisher}</h3>
<h4>${recipeDetails.title}</h4>
<h6>${recipeDetails.ingredients}</h6>
    `
    document.getElementById('recipeData').innerHTML=recipe;
}


