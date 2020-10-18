// -----------------QUERY SELECTORS-----------------:
const heroContainer = document.querySelector('.hero-container');
const navbarTitle = document.querySelector('.navbar-whats-cookin')
const navbarUserNameWrapper = document.querySelector('.navbar-user-name-wrapper');
const navbarUserName = document.querySelector('.navbar-user-name');
const navbarUserSectionWrapper = document.querySelector('.navbar-user-section-wrapper');
const navbarUserSection = document.querySelector('.navbar-user-section');
const navbar = document.querySelector('.navbar');

const userAccounts = document.querySelector('.user-accounts');

const main = document.querySelector('main');
const homeView = document.querySelector('.home-view');
const recipeView = document.querySelector('.recipe-view');
const userView = document.querySelector('.main-user-body');
const toCookView = document.querySelector('.to-cook-view');
const favoritesView = document.querySelector('.favorites-view');
const pantryView = document.querySelector('.pantry-view');

const recipeImage = document.querySelector('.recipe-image');
const searchInput = document.querySelector('.search-input');

const userAccountsIcon = document.querySelector('.accounts-icon');
const userProfileIcon = document.querySelector('.dropdown-header-icon');
const profileList = document.querySelector(".profile-list");

const profileRecipesToCook = document.querySelector('#profile-dropdown-recipes-to-cook')
const profileFavoriteRecipes = document.querySelector('#profile-dropdown-favorite-recipes')
const profilePantry = document.querySelector('#profile-dropdown-pantry')
const profileLogOut = document.querySelector('#profile-dropdown-log-out')

const headerIcon = document.querySelector('.dropdown-content');
const cookieIcon = document.querySelector('.solid-cookie-icon');
const bookmarkIcon = document.querySelector('.bookmark-icon');

let currentUser;
// -----------------EVENT LISTENERS-----------------:
window.addEventListener("load", sortUserAccounts);
navbarTitle.addEventListener('click', displayHomePage);
userAccounts.addEventListener("click", determineUser);
// window.addEventListener("click", iconClickHandler);
profileList.addEventListener("click", displayUserSectionHandler);
// whatsCookinNavBar.addEventListener('click', displayHomePage);
recipeImage.addEventListener('click', displayRecipePage);
main.addEventListener("click", clickHandler);
searchInput.addEventListener('click', extendSearchBar);
searchInput.addEventListener('keypress', searchInputHandler);
// -----------------FUNCTIONS-----------------:
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

// *---*---*USER SECTION functions*---*----*:
// *********      Sorting user drop down    **********
function sortUserAccounts() {
  let sortedUsersData = usersData.sort((a, b) => {
    return a.name > b.name ? -1 : 1
  });
  sortedUsersData.forEach(user => {
    userAccounts.insertAdjacentHTML('afterbegin', `
    <a href="#"><img class="dropdown-icons" src="../assets/user-solid.svg" alt="">
      ${user.name}</a>
    `)
  })
};
// *********      WHICH USER IS BEING CHOSEN    **********
function determineUser() {
  let userObject = usersData.find(user => user.name === event.target.innerText.trim() ? user : null);
  userObject !== null ? displayUserIcon(userObject) : null;
  // translateIngredientCode(userObject);
  currentUser = new User(userObject)
};
// *********      CHANGE USER NAME NAVBAR    **********
function displayUserName(user) {
  if (user) {
    navbarUserNameWrapper.classList.add('navbar-user-name-wrapper--active')
    navbarUserName.innerText = `${user.name.split(' ')[0]}`;
  } else {
    navbarUserNameWrapper.classList.remove('navbar-user-name-wrapper--active')
  }
}
// *********     SWITCH CHOOSE USER TO USER ICON    **********
function displayUserIcon(user) {
  userAccountsIcon.classList.add("hidden");
  userProfileIcon.classList.remove("hidden");
  hideHero();
  displayUserName(user);
}

function displaySectionName(section) {
  if (section === 'pantry') {
    navbarUserSectionWrapper.classList.add('navbar-user-section-wrapper--active')
    navbarUserSection.innerText = '.pantry';
  } else if (section === 'favorites') {
    navbarUserSectionWrapper.classList.add('navbar-user-section-wrapper--active')
    navbarUserSection.innerText = '.favorites';
  } else if (section === 'to cook') {
    navbarUserSectionWrapper.classList.add('navbar-user-section-wrapper--active')
    navbarUserSection.innerText = '.toCook';
  } else {
    navbarUserSectionWrapper.classList.remove('navbar-user-section-wrapper--active')
  }
}

// *---*---*SEARCH BAR functions*---*----*:
function extendSearchBar() {
  searchInput.classList.add('search-input--clicked');
};

function displaySearchResult() {
  recipes.forEach(recipe => {
    recipe.filter(recipeName => {
      return recipeName.includes(searchInput.innerText)
    })
  })
  searchInput.innerText
};

function searchInputHandler(e) {
  console.log(searchInput.innerText);
  if (e.key === 'Enter' && searchInput.innerText.length !== 0) {
    // displayRecipePage();
    displaySearchResult()
  }
};

// *---*---*DISPLAY PAGE functions*---*----*:

function hideHero() {
  heroContainer.classList.add('hidden');
}

function displayHomePage() {
  heroContainer.classList.remove('hidden');
  homeView.classList.remove('hidden');
  recipeView.classList.add('hidden');
  displaySectionName()
};

function displayRecipePage() {
  heroContainer.classList.add('hidden');
  homeView.classList.add('hidden');
  recipeView.classList.remove('hidden');
  displaySectionName()
};

function displayUserPage(section) {
  heroContainer.classList.add('hidden');
  homeView.classList.add('hidden');
  userView.classList.remove('hidden');

  if (section === 'pantry') {
    pantryView.classList.remove("hidden");
    favoritesView.classList.add("hidden");
    toCookView.classList.add("hidden");
    displaySectionName('pantry')
  } else if (section === 'favorites') {
    pantryView.classList.add("hidden");
    favoritesView.classList.remove("hidden");
    toCookView.classList.add("hidden");
    displaySectionName('favorites')
  } else if (section === 'to cook') {
    pantryView.classList.add("hidden");
    favoritesView.classList.add("hidden");
    toCookView.classList.remove("hidden");
    displaySectionName('to cook')
  } else if (section === 'logout') {
    userAccountsIcon.classList.remove("hidden");
    userProfileIcon.classList.add("hidden");
    userView.classList.add("hidden");
    homeView.classList.remove('hidden');
    displayUserName();
    displaySectionName()
    currentUser = null;
  }
}

// function displayRecipesToCook() {
//
// };
//
// function displayFavoriteRecipes() {
//
// };

function translateIngredientNumberToName(ingredientNumber) {
  const ingredientName = ingredientsData.find(ingredient => ingredient.id === ingredientNumber);
  return ingredientName.name;
}

function populatePantry() {
  pantryView.innerHTML = "";
  currentUser.pantry.contents.forEach(item => {
    let ingredientName = translateIngredientNumberToName(item.ingredient);
   pantryView.insertAdjacentHTML('afterbegin', `
  <section class='pantry-item-block'>
    <div class="delete-item-container">
      <img class="delete pantry-icon" src="../assets/times-solid.svg">
    </div>
    <div class="pantry-item">
      <p>${ingredientName}</p>
      </div>
      <div class="item-quantity">
        <img class="minus pantry-icon" src="../assets/minus.svg">
        <input class="item-amount-input" type="text" placeholder="${item.amount}">
        <img class="plus pantry-icon" src="../assets/plus.svg">
      </div>
  </section>
    `)
  })
};

// *---*---*EVENT HANDLER functions*---*----*:

function clickHandler(event) {
  if (event.target.className.includes('recipe-image')) {
    displayRecipePage()
  } else if (event.target !== searchInput) {
    searchInput.classList.remove('search-input--clicked')
  }
}

function displayUserSectionHandler(event) {
  console.log(event.target.innerText);
  if (event.target.innerText.trim() === "Recipes To Cook") {
    displayUserPage('to cook');
  } else if (event.target.innerText.trim() === "Favorited Recipes") {
    displayUserPage('favorites');
  } else if (event.target.innerText.trim() === "My Pantry") {
    displayUserPage('pantry');
    populatePantry();
  } else if (event.target.innerText.trim() === "Log Out") {
    displayUserPage('logout');
  }
};
