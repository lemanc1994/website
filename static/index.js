// index.js

document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const popupSignup = document.getElementById('popup-signup');

    // Function to show the pop-up
    function showPopup() {
        popup.style.display = 'flex'; // Use 'flex' to center content
    }

    // Function to hide the pop-up
    function hidePopup() {
        popup.style.display = 'none';
    }

    // Show pop-up after 2 seconds
    setTimeout(showPopup, 2000); // 2000 milliseconds = 2 seconds

    // Hide pop-up when clicking outside of the pop-up content
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            hidePopup();
        }
    });

    // Flash colors for buttons
    function flashButton(button) {
        const colors = ['green', 'yellow', 'pink'];
        let index = 0;

        setInterval(() => {
            button.style.backgroundColor = colors[index];
            index = (index + 1) % colors.length; // Cycle through colors
        }, 500); // Change color every 500 milliseconds
    }

    // Get all buttons and apply the flashing effect
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => flashButton(button));
});

// Rotate profile picture on load
window.onload = function() {
    const profilePic = document.querySelector('.profile-picture img');
    profilePic.classList.add('rotate');
};
