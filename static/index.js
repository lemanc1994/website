let people = [
    { name: 'Jordan K', score: 18, active: false },
    { name: 'Graham', score: 20, active: false },
    { name: 'Jordan Y', score: 9, active: false },
    { name: 'James', score: 20, active: false },
    { name: 'Josh', score: -5, active: false },
    { name: 'Dave', score: 150, active: false },
    { name: 'Brendan', score: 5, active: false },
    { name: 'Amy', score: 20, active: false },
    { name: 'Katie', score: 20, active: false },
    { name: 'Sophie', score: 9, active: false },
    { name: 'Stefan', score: -15, active: false },
    { name: 'Lucy', score: -25, active: false },
    { name: 'Becca', score: -25, active: false },
    { name: 'Alex', score: 10, active: false }
];

const nameTagsContainer = document.getElementById('name-tags-container');
const newNameInput = document.getElementById('new-name-input');
const submitNameBtn = document.getElementById('submit-name-btn');
const allPeopleList = document.getElementById('all-people-list');

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

    // Update the total score based on active people
    updateTotalScore();
}

// Function to update the person's score and refresh the available people list
function updatePersonScore(index, score) {
    people[index].score = parseInt(score);
    updateTotalScore();
}

// Function to display all people in the "Available People" tab
function displayAllPeople() {
    allPeopleList.innerHTML = ''; // Clear the list

    people.forEach((person, index) => {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person-item');

        personDiv.innerHTML = `
            <label>${person.name}</label>
            <input type="number" value="${person.score}" data-index="${index}" onchange="updatePersonScore(${index}, this.value)">
            <button class="remove-btn" onclick="removePerson(${index})">Remove</button>
        `;
        allPeopleList.appendChild(personDiv);
    });
}

// Function to reset all scores and deactivate all people
function resetAllScores() {
    people.forEach((person, index) => {
        person.score = 0;
        person.active = false; // Reset the active state for everyone
        updatePersonScore(index, 0);  // Reset the score for each person
    });
    generateTags(); // Regenerate tags to reset active classes
    updateTotalScore();
}

// Function to update the total score based on active people
function updateTotalScore() {
    let totalScore = people.reduce((total, person) => {
        return total + (person.active ? person.score : 0); // Only include active people's scores
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

    // Add the new person to the list
    const newIndex = people.length;
    people.push({ name: newName, score: 0, active: false });

    // Regenerate tags and refresh the available people list
    generateTags();
    displayAllPeople();

    // Clear the input field
    newNameInput.value = "";
}

// Function to remove a person from the list
function removePerson(index) {
    people.splice(index, 1);  // Remove the person from the array
    generateTags();           // Regenerate the tags on the tracker page
    displayAllPeople();       // Refresh the available people list
}

// Event listener for the 'Submit' button to add new person
submitNameBtn.addEventListener('click', addNewPerson);

// Event listener for the reset button
document.getElementById('reset-btn').addEventListener('click', resetAllScores);

// Initialize the tag generation and display of all people
document.addEventListener('DOMContentLoaded', function () {
    // Default to showing the tracker page
    showPage('tracker-page');
    generateTags(); // Generate tags on tracker page
    displayAllPeople(); // Display all people on the Available People page
});
