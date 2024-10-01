let people = [
    { name: 'Jordan Kennedy', score: 0, active: false },
    { name: 'Graham', score: 0, active: false },
    { name: 'Jordan Yates', score: 0, active: false },
    { name: 'James', score: 0, active: false },
    { name: 'Josh', score: 0, active: false },
    { name: 'Dave', score: 0, active: false },
    { name: 'Brendan', score: 0, active: false },
    { name: 'Amy', score: 0, active: false },
    { name: 'Katie', score: 0, active: false },
    { name: 'Sophie', score: 0, active: false },
    { name: 'Stefan', score: 0, active: false },
    { name: 'Lucy', score: 0, active: false },
    { name: 'Becca', score: 0, active: false },
    { name: 'Alex', score: 0, active: false }
];


// List of drinks and their average prices and calories
const drinks = [
    { name: 'Lager (Pint)', price: 4.97, calories: 180 },
    { name: 'Lager (Half)', price: 2.50, calories: 90 },
    { name: 'Wine (Large)', price: 6, calories: 220 },
    { name: 'Wine (Medium)', price: 5.50, calories: 160 },
    { name: 'Wine (Small)', price: 5, calories: 120 },
    { name: 'Spirit + Mixer (S)', price: 6.50, calories: 100 },
    { name: 'Spirit + Mixer (D)', price: 8.50, calories: 200 },
    { name: 'Shot', price: 4.50, calories: 70 }
];

// Keep track of drinks added and total spend
let drinkItems = [];
let totalSpend = 0;

const nameTagsContainer = document.getElementById('name-tags-container');
const newNameInput = document.getElementById('new-name-input');
const submitNameBtn = document.getElementById('submit-name-btn');
const allPeopleList = document.getElementById('all-people-list');
const drinksList = document.getElementById('drinks-list');
const drinkButtonsContainer = document.getElementById('drink-buttons-container');

// Create the total spend element
const totalSpendElement = document.createElement('p');
totalSpendElement.classList.add('total-spend'); // Add a class for styling
totalSpendElement.textContent = "Total Spend: £0.00"; // Default value

// Create the total calories element
const totalCaloriesElement = document.createElement('p');
totalCaloriesElement.classList.add('total-calories'); // Add a class for styling
totalCaloriesElement.textContent = "Total Calories: 0 kcal"; // Default value

// Create a container for both total spend and total calories
const totalsContainer = document.createElement('div');
totalsContainer.classList.add('totals-container'); // Add a class for styling

// Append total spend and total calories to the container
totalsContainer.appendChild(totalSpendElement);
totalsContainer.appendChild(totalCaloriesElement);

// Append the totals container below the reset button
document.querySelector('.reset-container').appendChild(totalsContainer);

// Function to load data from localStorage
function loadFromLocalStorage() {
    const savedPeople = localStorage.getItem('people'); // Retrieve saved people data from localStorage

    if (savedPeople) {
        people = JSON.parse(savedPeople); // Update the people array with the saved data
    }

    // Generate the name tags on the tracker page
    generateTags();

    // Refresh the total score and tag states (active or inactive)
    updateTotalScore();
}


// Function to update the total spend display
function updateTotalSpend() {
    totalSpendElement.textContent = `Total Spend: £${totalSpend.toFixed(2)}`;
}

// Function to update the total calories display
function updateTotalCalories() {
    let totalCalories = 0;

    // If no drinks are selected, totalCalories will remain 0
    if (drinkItems.length > 0) {
        drinkItems.forEach((drinkName) => {
            const drink = drinks.find(d => d.name === drinkName);
            if (drink && drink.calories) {
                totalCalories += drink.calories;
            }
        });
    }

    // Always display total calories, even if it's 0
    totalCaloriesElement.textContent = `Total Calories: ${totalCalories} kcal`;
}

// Function to show a specific page based on the tab selected
function showPage(pageId) {
    const tabs = document.getElementsByClassName('tab-content');
    for (let tab of tabs) {
        tab.classList.remove('active');
    }
    document.getElementById(pageId).classList.add('active');
}

// Function to generate the name tags on the tracker page
function generateTags() {
    nameTagsContainer.innerHTML = ''; // Clear the container

    people.forEach((person, index) => {
        createTag(person.name, index);
    });
}

// Function to create a tag on the Tracker page
function createTag(name, index) {
    const tag = document.createElement('button');
    tag.innerHTML = name;
    tag.classList.add('name-tag');
    tag.setAttribute('data-index', index);
    tag.addEventListener('click', () => togglePersonActive(index));
    nameTagsContainer.appendChild(tag);
}

// Function to toggle whether a person is active or not
function togglePersonActive(index) {
    people[index].active = !people[index].active;

    const tagButton = document.querySelector(`[data-index="${index}"]`);
    if (people[index].active) {
        tagButton.classList.add('active');
    } else {
        tagButton.classList.remove('active');
    }

    // Update total score and save state in localStorage
    updateTotalScore();
    localStorage.setItem('people', JSON.stringify(people)); // Save to localStorage
}


// Function to update the person's score and refresh the available people list
function updatePersonScore(index, score) {
    people[index].score = parseInt(score); // Update the person's score
    updateTotalScore(); // Update the total score
    localStorage.setItem('people', JSON.stringify(people)); // Save to localStorage
}


// Function to display all people in the "Available People" tab
function displayAllPeople() {
    allPeopleList.innerHTML = ''; // Clear the list

    people.forEach((person, index) => {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person-entry');

        personDiv.innerHTML = `
            <label>${person.name}</label>
            <input type="number" value="${person.score}" data-index="${index}" onchange="updatePersonScore(${index}, this.value)">
            <button onclick="removePerson(${index})" class="remove-person-btn">Remove</button>
        `;
        allPeopleList.appendChild(personDiv);
    });
}

// Function to remove a person
function removePerson(index) {
    people.splice(index, 1);
    displayAllPeople();
    generateTags();
    localStorage.setItem('people', JSON.stringify(people));
}

// Function to reset all scores and deactivate all people
function resetAllScores() {
    people.forEach((person, index) => {
        person.score = 0;
        person.active = false;
        updatePersonScore(index, 0);
    });
    generateTags();
    updateTotalScore();
    localStorage.setItem('people', JSON.stringify(people));
}

// Function to update the total score based on active people
function updateTotalScore() {
    let totalScore = people.reduce((total, person) => {
        return total + (person.active ? person.score : 0);
    }, 0);

    document.getElementById('total-score').textContent = `Total Score: ${totalScore}`;

    const decisionElement = document.getElementById('decision');
    if (totalScore > 10) {
        decisionElement.textContent = "Can you drink? No";
        decisionElement.classList.remove('safe');
        decisionElement.classList.add('warning');
    } else {
        decisionElement.textContent = "Can you drink? Yes";
        decisionElement.classList.remove('warning');
        decisionElement.classList.add('safe');
    }
}

// Function to add a new person
function addNewPerson() {
    const newName = newNameInput.value.trim();

    if (newName === "") {
        alert("Please enter a name.");
        return;
    }

    const newIndex = people.length;
    people.push({ name: newName, score: 0, active: false });

    generateTags();
    displayAllPeople();

    newNameInput.value = "";
    localStorage.setItem('people', JSON.stringify(people));
}

// Event listener for the 'Submit' button to add new person
submitNameBtn.addEventListener('click', addNewPerson);



// Drinks section: Creating buttons and updating drinks list
function createDrinkButtons() {
    drinks.forEach((drink) => {
        const drinkTag = document.createElement('button');
        drinkTag.innerHTML = drink.name;
        drinkTag.classList.add('drink-tag');
        drinkTag.addEventListener('click', () => addDrinkToList(drink));
        drinkButtonsContainer.appendChild(drinkTag);
    });
}

// Function to add a drink to the list and update total spend
function addDrinkToList(drink) {
    drinkItems.push(drink.name);
    totalSpend += drink.price; // Add drink price to total spend
    updateDrinkList();
    updateTotalSpend();
    updateTotalCalories(); // Also update total calories
    localStorage.setItem('drinks', JSON.stringify(drinkItems));
    localStorage.setItem('totalSpend', totalSpend.toFixed(2));
}

// Function to update the drink list display
function updateDrinkList() {
    drinksList.innerHTML = ''; // Clear the list

    drinkItems.forEach((drink, index) => {
        const drinkDiv = document.createElement('div');
        drinkDiv.classList.add('drink-entry');
        drinkDiv.innerHTML = `
            <span>${drink}</span>
            <button class="remove-drink-btn" onclick="removeDrink(${index})">Remove</button>
        `;
        drinksList.appendChild(drinkDiv);
    });
}

// Function to remove a drink and update total spend
function removeDrink(index) {
    const removedDrinkName = drinkItems[index];
    const removedDrink = drinks.find(d => d.name === removedDrinkName);

    if (removedDrink) {
        totalSpend -= removedDrink.price; // Subtract the drink's price from total spend
    }

    drinkItems.splice(index, 1);
    updateDrinkList();
    updateTotalSpend();
    updateTotalCalories(); // Also update total calories
    localStorage.setItem('drinks', JSON.stringify(drinkItems));
    localStorage.setItem('totalSpend', totalSpend.toFixed(2));
}

// Function to clear all drinks and reset total spend
function clearAllDrinks() {
    drinkItems = [];
    totalSpend = 0; // Reset total spend
    updateDrinkList();
    updateTotalSpend();
    updateTotalCalories(); // Reset total calories
    localStorage.setItem('drinks', JSON.stringify(drinkItems));
    localStorage.setItem('totalSpend', totalSpend.toFixed(2));
}

// Event listener for the clear drinks button
document.getElementById('clear-drinks-btn').addEventListener('click', clearAllDrinks);

// Initialize the tag generation, drink buttons, and display of all people
document.addEventListener('DOMContentLoaded', function () {
    const nameTagsContainer = document.getElementById('name-tags-container');
    const newNameInput = document.getElementById('new-name-input');
    const submitNameBtn = document.getElementById('submit-name-btn');
    const allPeopleList = document.getElementById('all-people-list');
    const drinksList = document.getElementById('drinks-list');
    const drinkButtonsContainer = document.getElementById('drink-buttons-container');

    // Default to showing the tracker page
    showPage('tracker-page');

    loadFromLocalStorage(); // Load saved data from localStorage
    createDrinkButtons(); // Generate drink buttons for the Drinks Track



    // Default to showing the tracker page
    showPage('tracker-page');

    loadFromLocalStorage(); // Load saved data from localStorage

    createDrinkButtons(); // Generate drink buttons for the Drinks Tracker
});

// Create the "Clear All" button as a tag
const clearAllTag = document.createElement('button');
clearAllTag.textContent = "Clear All";
clearAllTag.classList.add('clear-all-tag'); // Add a class for styling

// Add event listener for clearing all people
clearAllTag.addEventListener('click', resetAllScores);


