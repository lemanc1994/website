// Array of people and their respective scores
const people = [
    { name: "Jordan Kennedy", score: 0 },
    { name: "Graham", score: 0 },
    { name: "Jordan Yates", score: 0 },
    { name: "James", score: 0 },
    { name: "Josh", score: 0 },
    { name: "Dave", score: 0 },
    { name: "Brendan", score: 0 },
    { name: "Amy", score: 0 },
    { name: "Katie", score: 0 },
    { name: "Sophie", score: 0 },
    { name: "Stefan", score: 0 },
    { name: "Lucy", score: 0 },
    { name: "Becca", score: 0 },
    { name: "Alex", score: 0 }
];

// Function to dynamically create the table rows with sliders
function populatePeopleList() {
    const peopleList = document.getElementById('people-list');
    peopleList.innerHTML = ''; // Clear any existing content

    people.forEach((person, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.name}</td>
            <td><input type="checkbox" class="present-checkbox" data-index="${index}" onclick="updateScore()"></td>
            <td>
                <input type="range" class="score-slider" id="slider-${index}" min="-100" max="100" value="${person.score}"
                oninput="updateSliderValue(${index})">
                <span id="slider-value-${index}">(${person.score})</span> <!-- Display the score next to the slider -->
            </td>
        `;
        peopleList.appendChild(row);
    });
}

// Update the displayed value as the slider is moved
function updateSliderValue(index) {
    const slider = document.getElementById(`slider-${index}`);
    const sliderValue = document.getElementById(`slider-value-${index}`);
    const value = parseInt(slider.value);

    // Update the score next to the slider
    sliderValue.innerText = `(${value})`;

    updateScore(); // Recalculate the total score
}

// Update total score based on selected people
function updateScore() {
    let totalScore = 0;
    let hasChecked = false; // Flag to check if any checkbox is selected
    const decisionElement = document.getElementById('decision');

    // Loop through all checkboxes to calculate the total score
    document.querySelectorAll('#people-list input[type="checkbox"]').forEach(function (checkbox) {
        const index = checkbox.getAttribute('data-index');
        const score = parseInt(document.getElementById(`slider-${index}`).value);

        if (checkbox.checked) {
            totalScore += score;
            hasChecked = true; // At least one checkbox is checked
        }
    });

    // Update the total score in the UI
    document.getElementById('total-score').innerText = "Total Score: " + totalScore;

    // If no checkboxes are checked, hide the decision element
    if (hasChecked) {
        decisionElement.style.display = 'flex'; // Show the decision section if any checkbox is checked
        updateDecision(totalScore); // Update the decision text and color based on score
    } else {
        decisionElement.style.display = 'none'; // Hide the decision section if no checkboxes are checked
    }
}

// Update decision text and change class based on score
function updateDecision(totalScore) {
    const decisionElement = document.getElementById('decision');
    const decisionText = decisionElement.querySelector('.decisionText');

    // Remove all existing classes
    decisionElement.classList.remove('safe', 'warning', 'life');

    if (totalScore > 10) {
        decisionElement.classList.add('warning'); // Add warning class
        decisionText.innerHTML = 'Can you drink? No';
    } else if (totalScore <= 10) {
        decisionElement.classList.add('safe'); // Add safe class
        decisionText.innerHTML = 'Safe to Drink';
    } else {
        decisionElement.classList.add('life'); // Add life class if other condition applies
        decisionText.innerHTML = 'Stop!';
    }
}

// Populate the people list on page load
document.addEventListener('DOMContentLoaded', populatePeopleList);

// Function to dynamically create the table rows with sliders
function populatePeopleList() {
    const peopleList = document.getElementById('people-list');
    peopleList.innerHTML = ''; // Clear any existing content

    people.forEach((person, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.name}</td>
            <td><input type="checkbox" class="present-checkbox" data-index="${index}" onclick="updateScore()"></td>
            <td>
                <input type="range" class="score-slider" id="slider-${index}" min="-100" max="100" value="${person.score}"
                oninput="updateSliderValue(${index})">
                <span id="slider-value-${index}">(${person.score})</span> <!-- Display the score next to the slider -->
            </td>
        `;
        peopleList.appendChild(row);
    });
}

// Function to reset all sliders and checkboxes to zero
function resetToZero() {
    document.querySelectorAll('.score-slider').forEach(function (slider) {
        slider.value = 0; // Reset the slider value to zero
        const index = slider.getAttribute('id').split('-')[1];
        document.getElementById(`slider-value-${index}`).innerText = '(0)'; // Reset the displayed value to zero
    });

    document.querySelectorAll('.present-checkbox').forEach(function (checkbox) {
        checkbox.checked = false; // Uncheck all checkboxes
    });

    updateScore(); // Update the total score and decision after reset
}

// Update the displayed value as the slider is moved
function updateSliderValue(index) {
    const slider = document.getElementById(`slider-${index}`);
    const sliderValue = document.getElementById(`slider-value-${index}`);
    const value = parseInt(slider.value);

    // Update the score next to the slider
    sliderValue.innerText = `(${value})`;

    updateScore(); // Recalculate the total score
}

// Update total score based on selected people
function updateScore() {
    let totalScore = 0;
    let hasChecked = false; // Flag to check if any checkbox is selected
    const decisionElement = document.getElementById('decision');

    // Loop through all checkboxes to calculate the total score
    document.querySelectorAll('#people-list input[type="checkbox"]').forEach(function (checkbox) {
        const index = checkbox.getAttribute('data-index');
        const score = parseInt(document.getElementById(`slider-${index}`).value);

        if (checkbox.checked) {
            totalScore += score;
            hasChecked = true; // At least one checkbox is checked
        }
    });

    // Update the total score in the UI
    document.getElementById('total-score').innerText = totalScore;

    // If no checkboxes are checked, hide the decision element
    if (hasChecked) {
        decisionElement.style.display = 'flex'; // Show the decision section if any checkbox is checked
        updateDecision(totalScore); // Update the decision text and color based on score
    } else {
        decisionElement.style.display = 'none'; // Hide the decision section if no checkboxes are checked
    }
}

// Update decision text and change class based on score
function updateDecision(totalScore) {
    const decisionElement = document.getElementById('decision');
    const decisionText = decisionElement.querySelector('.decisionText');

    // Remove all existing classes
    decisionElement.classList.remove('safe', 'warning', 'life');

    if (totalScore > 10) {
        decisionElement.classList.add('warning'); // Add warning class
        decisionText.innerHTML = 'Can you drink? No';
    } else if (totalScore <= 10 && totalScore >= 0) {
        decisionElement.classList.add('safe'); // Add safe class
        decisionText.innerHTML = 'Can you drink? Yes';
    } else {
        decisionElement.classList.add('life'); // Add life class if other condition applies
        decisionText.innerHTML = 'Special Condition!';
    }
}

// Populate the people list on page load
document.addEventListener('DOMContentLoaded', () => {
    populatePeopleList();

    // Attach reset button event
    document.getElementById('reset-btn').addEventListener('click', resetToZero);
});

