/// <reference types="../@types/jquery" />
const urlCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
const urlArea = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
const urlIngredients =
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
// !=========loading=========
$(function () {
  displaySearchByName("a");
  $(".loading").fadeOut(1000, function () {
    $("body , html").css("overflow", "visible");
  });
  closeNavbar();
});
// !=========aside bar=========
let aside = false;
let asideWidth = $(".left-nav").innerWidth();
function closeNavbar(e) {
  $(e).removeClass("fa-close");
  $(e).addClass("fa-bars");
  aside = false;
  $(".aside").animate(
    {
      left: -asideWidth,
    },
    500
  );
  $(".links li").animate(
    {
      top: 50,
    },
    400
  );
}
function openNavbar(e) {
  $(e).removeClass("fa-bars");
  $(e).addClass("fa-close");
  aside = true;
  $(".aside").animate(
    {
      left: "0",
    },
    500
  );
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}
$(".menu").on("click", function () {
  if (aside) {
    closeNavbar(this);
  } else {
    openNavbar(this);
  }
});
$(".links li").on("click", function () {
  closeNavbar(".menu");
  $(".row").html(" ");
  $(".row-details").html(" ");
  $(".row-search").html(" ");
  $(".row-contact").html(" ");
});

$(".search").on("click", function () {
  displaySearch();
});
$(".categories").on("click", function () {
  categoriesFun();
});
$(".ingredients").on("click", function () {
  ingredientsFun();
});
$(".area").on("click", function () {
  areaFun();
});
$(".contact").on("click", function () {
  displayContacts();
});

async function displaySearchByName(name) {
  $(".loading").fadeIn(300, function () {
    $("body , html").css("overflow", "hidden");
  });
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await api.json();
  console.log("done");
  data.meals ? displayMeals(data.meals) : $(".row").html(" ");
  closeNavbar();
  $(".loading").fadeOut(300, function () {
    $("body , html").css("overflow", "visible");
  });
}
async function displaySearchByLetter(letter) {
  $(".loading").fadeIn(300, function () {
    $("body , html").css("overflow", "hidden");
  });
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let data = await api.json();
  data.meals ? displayMeals(data.meals) : $(".row").html(" ");
  closeNavbar();
  $(".loading").fadeOut(300, function () {
    $("body , html").css("overflow", "visible");
  });
}
async function categoriesFun() {
  $(".loading").fadeIn(300, function () {
    $("body , html").css("overflow", "hidden");
  });
  let api = await fetch(urlCategories);
  let data = await api.json();
  displayCategories(data.categories);
  closeNavbar();
  $(".loading").fadeOut(300, function () {
    $("body , html").css("overflow", "visible");
  });
}
async function categoriesMealsFun(categoric) {
  $(".loading").fadeIn(300, function () {
    $("body , html").css("overflow", "hidden");
  });
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoric}`
  );
  let data = await api.json();
  displayMeals(data.meals.slice(0, 20));
  closeNavbar();
  $(".loading").fadeOut(300, function () {
    $("body , html").css("overflow", "visible");
  });
}
async function areaFun() {
  $(".loading").fadeIn(300, function () {
    $("body , html").css("overflow", "hidden");
  });
  let api = await fetch(urlArea);
  let data = await api.json();
  displayArea(data.meals);
  closeNavbar();
  $(".loading").fadeOut(300, function () {
    $("body , html").css("overflow", "visible");
  });
}
async function areaMealsFun(city) {
  $(".loading").fadeIn(300, function () {
    $("body , html").css("overflow", "hidden");
  });
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${city}`
  );
  let data = await api.json();
  displayMeals(data.meals);
  closeNavbar();
  $(".loading").fadeOut(300, function () {
    $("body , html").css("overflow", "visible");
  });
}
async function ingredientsFun() {
  $(".loading").fadeIn(300, function () {
    $("body , html").css("overflow", "hidden");
  });
  let api = await fetch(urlIngredients);
  let data = await api.json();
  displayIngredients(data.meals.slice(0, 20));
  closeNavbar();
  $(".loading").fadeOut(300, function () {
    $("body , html").css("overflow", "visible");
  });
}
async function ingredientsMealsFun(meanIngredients) {
  $(".loading").fadeIn(300, function () {
    $("body , html").css("overflow", "hidden");
  });
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${meanIngredients}`
  );
  let data = await api.json();
  displayMeals(data.meals.slice(0, 20));
  closeNavbar();
  $(".loading").fadeOut(300, function () {
    $("body , html").css("overflow", "visible");
  });
}
async function detailsFun(id) {
  $(".loading").fadeIn(300, function () {
    $("body , html").css("overflow", "hidden");
  });
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await api.json();
  displayDetails(data.meals[0]);
  closeNavbar();
  $(".loading").fadeOut(300, function () {
    $("body , html").css("overflow", "visible");
  });
}

// !display
function displaySearch() {
  let carton = "";
  carton += `
  <div class="search-container mb-20 md:w-3/4 container mx-auto text-white grid gap-5 grid-cols-2">
            <input type="text" id="searchByName" placeholder="Search By Name"
            class="input-name border rounded-lg border-white p-2 inline-block bg-transparent focus:border-[#86b7fe]
            focus:shadow-lg"" />
            <input
              type="text"
              maxlength="1"
              id="searchByName"
              placeholder="Search By First Letter"
              class="input-letter border rounded-lg border-white p-2 inline-block bg-transparent focus:border-[#86b7fe] focus:shadow-lg"
            />
       </div>
`;
  $(".row-search").html(carton);
  $(".row").html(" ");
  $(".input-name").on("keyup", function () {
    let searchByName = $(this).val();
    if (searchByName) displaySearchByName(searchByName);
    else $(".row").html(" ");
  });
  $(".input-letter").on("keyup", function () {
    let searchByLetter = $(this).val();
    if (searchByLetter) displaySearchByLetter(searchByLetter);
    else $(".row").html(" ");
  });
}
function displayCategories(arr) {
  let carton = "";
  for (let i = 0; i < arr.length; i++) {
    carton += `
         <div date_id="${arr[i].idMeal}" date_name='${arr[i].strCategory}'
              class="box box-catagories text-center text-white relative rounded-md overflow-hidden group"
            >
              <img src="${arr[i].strCategoryThumb}" class="w-full" alt="" />
              <div
                class="box-layer p-2 absolute top-full left-0  w-full h-full bg-[#f9f6f6ca] text-black transition-all duration-500 group-hover:top-0"
              >
                <h3 class="text-[28px] font-medium">${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
              </div>
            </div>
`;
    $(".row").html(carton);
  }
  $(".box-catagories").on("click", function () {
    categoriesMealsFun($(this).attr("date_name"));
    console.log($(this).attr("date_name"));
  });
}
function displayArea(arr) {
  let carton = "";
  for (let i = 0; i < arr.length; i++) {
    carton += `
         <div data_city="${arr[i].strArea}"
              class="box box-area text-center text-white relative rounded-md overflow-hidden cursor-pointer "
            >
             <i class="fa-solid fa-house-laptop fa-4x"></i>
             <h3 class="text-[28px] font-medium">${arr[i].strArea}</h3>
            </div>
`;
    $(".row").html(carton);
  }
  $(".box-area").on("click", function () {
    areaMealsFun($(this).attr("data_city"));
  });
}
function displayIngredients(arr) {
  let carton = "";
  for (let i = 0; i < arr.length; i++) {
    carton += `
         <div date_id="${arr[i].idIngredient}" data_city='${
      arr[i].strIngredient
    }'
              class="box box-ingredient text-center  text-white relative rounded-md overflow-hidden c"
            >
           <i class="fa-solid fa-drumstick-bite fa-4x"></i>             <h3 class="text-[28px] font-medium">${
             arr[i].strIngredient
           }</h3>
             <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
`;
    $(".row").html(carton);
  }
  $(".box-ingredient").on("click", function () {
    ingredientsMealsFun($(this).attr("data_city"));
  });
}
function displayMeals(arr) {
  let carton = "";
  for (let i = 0; i < arr.length; i++) {
    carton += `
         <div date_id="${arr[i].idMeal}"
              class="box  box-item text-center text-white relative rounded-md overflow-hidden group"
            >
              <img src="${arr[i].strMealThumb}" class="w-full" alt="" />
              <div 
                class="box-layer text-center center p-2 absolute top-full left-0  w-full h-full bg-[#f9f6f6ca] text-black transition-all duration-500 group-hover:top-0"
              >
                <h3 class="text-[28px] font-medium m-auto">${arr[i].strMeal}</h3>
               
              </div>
            </div>
`;
    $(".row").html(carton);
  }
  $(".box-item").on("click", function () {
    detailsFun($(this).attr("date_id"));
  });
}
function displayDetails(arr) {
  let carton = "";
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (arr[`strIngredient${i}`]) {
      ingredients += `<li class="bg-[#cff4fc] text-[#055160]  p-2 rounded-lg">${
        arr[`strMeasure${i}`]
      } ${arr[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = arr.strTags?.split(",");
  let tagsStr = "";
  if (!tags) tags = [];
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
    <li class="bg-[#f8d7da] text-[#842029]  p-2 rounded-lg">${tags[i]}</li>`;
  }

  carton += `

          <div class="left px-4">
              <img src="${arr.strMealThumb}" class="w-full rounded-lg" alt="" />
              <h2 class="text-[32px] font-medium my-2">${arr.strMeal}</h2>
            </div>
            <div class="right px-4">
              <h2 class="text-[32px] font-medium my-2">Instructions</h2>
              <p>${arr.strInstructions}</p>
              <h3 class="text-[28px] font-medium my-2">
                <span class="font-bold">Area : </span> ${arr.strArea}
              </h3>
              <h3 class="text-[28px] font-medium my-2">
                <span class="font-bold">Category : </span> ${arr.strCategory}
              </h3>
              <h3 class="text-[28px] font-medium my-2">
                <span class="font-bold">Recipes : </span>
              </h3>
              <ul class="flex flex-wrap gap-2 row-recipes my-5">
                 ${ingredients}
              </ul>
              <h3 class="text-[28px] font-medium">
                <span class="font-bold">Tags : </span>
              </h3>
              <ul class="flex flex-wrap gap-2 row-recipes my-5">
               ${tagsStr}
              </ul>
              <a
                href=" ${arr.strMealThumb}"
                target="_blank"
                class="mx-1 p-2 rounded-lg  inline-block text-white bg-[#198754] hover:bg-[#157347] transition-all duration-300"
                >Source</a
              >
              <a  
                href=" ${arr.strYoutube}"
                target="_blank"
                class="mx-1 p-2 rounded-lg  inline-block text-white bg-[#dc3545] hover:bg-[#bb2d3b] transition-all duration-300"
                >Youtube</a
              >
            </div>
`;

  $(".row").html(" ");
  $(".row-details").html(carton);
}
// !contact us
function displayContacts() {
  document.querySelector(".row-contact").innerHTML = `
    <div class="container mx-auto w-3/4 grid md:grid-cols-2 gap-3">
      <div class="text-black mb-4">
        <input
          type="text"
          name="user_name"
          id="nameInput"
          class="inputName bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Your Name"
          required
        />
        <div id="nameAlert" class="alert-name alert hidden bg-[#f8d7da] text-[#842029] text-center p-6 my-2 rounded-lg">
          Special characters and numbers not allowed
        </div>
      </div>
      <div class="text-black mb-4">
        <input
          type="email"
          name="email"
          id="emailInput"
          class="inputEmail bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Your email"
          required
        />
        <div id="emailAlert" class="alert-email alert hidden bg-[#f8d7da] text-[#842029] text-center p-6 my-2 rounded-lg">
          Email not valid *example@yyy.zzz
        </div>
      </div>
      <div class="text-black mb-4">
        <input
          type="tel"
          id="phoneInput"
          name="phone"
          class="inputPhone bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Your phone"
          required
        />
        <div id="phoneAlert" class="alert-phone alert hidden bg-[#f8d7da] text-[#842029] text-center p-6 my-2 rounded-lg">
          Enter valid Phone Number
        </div>
      </div>
      <div class="text-black mb-4">
        <input
          type="number"
          id="ageInput"
          name="age"
          class="inputAge bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Your Age"
          required
        />
        <div id="ageAlert" class="alert-age alert hidden bg-[#f8d7da] text-[#842029] text-center p-6 my-2 rounded-lg">
          Enter valid age
        </div>
      </div>
      <div class="text-black mb-4">
        <input
          type="password"
          id="passwordInput"
          name="password"
          class="inputPassword bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Your Password"
          required
        />
        <div id="passwordAlert" class="alert-password alert hidden bg-[#f8d7da] text-[#842029] text-center p-6 my-2 rounded-lg">
          Enter valid password *Minimum eight characters, at least one letter and one number*
        </div>
      </div>
      <div class="text-black mb-4">
        <input
          type="password"
          id="repasswordInput"
          name="RePassword"
          class="inputRePassword bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="RePassword"
          required
        />
        <div id="repasswordAlert" class="alert-RePassword alert hidden bg-[#f8d7da] text-[#842029] text-center p-6 my-2 rounded-lg">
          Enter Valid RePassword
        </div>
      </div>
    </div>
    <button id="submitBtn" disabled="true" class="text-[#dc3545] border border-[#dc3545] hover:bg-[#dc3545] hover:text-white transition-all duration-300 p-2 mt-3 rounded-lg">
      Submit
    </button>
  `;

  const inputs = document.querySelectorAll(".row-contact input");
  inputs.forEach((input) => {
    input.addEventListener("keyup", () => {
      inputsValidation();
    });
    input.addEventListener("focus", () => {
      switch (input.id) {
        case "nameInput":
          nameInputTouched = true;
          break;
        case "emailInput":
          emailInputTouched = true;
          break;
        case "phoneInput":
          phoneInputTouched = true;
          break;
        case "ageInput":
          ageInputTouched = true;
          break;
        case "passwordInput":
          passwordInputTouched = true;
          break;
        case "repasswordInput":
          repasswordInputTouched = true;
          break;
      }
    });
  });
}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
function clearInputs() {
  document.getElementById("nameInput").value = "";
  document.getElementById("phoneInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("ageInput").value = "";
  document.getElementById("passwordInput").value = "";
  document.getElementById("repasswordInput").value = "";
}
// !validation

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.add("hidden");
    } else {
      document.getElementById("nameAlert").classList.remove("hidden");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document.getElementById("emailAlert").classList.add("hidden");
    } else {
      document.getElementById("emailAlert").classList.remove("hidden");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.add("hidden");
    } else {
      document.getElementById("phoneAlert").classList.remove("hidden");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.add("hidden");
    } else {
      document.getElementById("ageAlert").classList.remove("hidden");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.add("hidden");
    } else {
      document.getElementById("passwordAlert").classList.remove("hidden");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.add("hidden");
    } else {
      document.getElementById("repasswordAlert").classList.remove("hidden");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
    document.getElementById("submitBtn").addEventListener("click", function () {
      alert("succeed");
      clearInputs();
    });
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

// showContacts();
