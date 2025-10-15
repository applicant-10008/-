/*
 * script.js
 * --------------------------------
 * This file adds simple interactivity to your website.
 * It handles hover effects on social media buttons to change the body background.
 */

// Function to handle the hover effect
function handleButtonHover(event) {
    const li = event.currentTarget;
    const button = li.querySelector('button');
    let hoverColor;

    // Get the base color of the button using CSS computed style
    // This is a simple approximation. A more complex approach might be needed
    // for exact gradient colors.
    const computedStyle = window.getComputedStyle(button);
    const originalBackground = computedStyle.getPropertyValue('background-image') || computedStyle.getPropertyValue('background-color');

    // Assign a corresponding subtle background color
    if (li.querySelector('a').textContent.includes('DISCORD')) {
        hoverColor = '#d3d7eb'; // Light Discord color
    } else if (li.querySelector('a').textContent.includes('INSTAGRAM')) {
        hoverColor = '#fcd0a2'; // Light Orange/Pink
    } else if (li.querySelector('a').textContent.includes('X(TWEETER)')) {
        hoverColor = '#c7e6ff'; // Light Blue/Gray
    } else {
        hoverColor = '#e0f0ff'; // Default light blue
    }

    // Apply the color on mouseover
    li.addEventListener('mouseover', () => {
        document.body.style.backgroundColor = hoverColor;
    });

    // Revert the color on mouseout
    li.addEventListener('mouseout', () => {
        document.body.style.backgroundColor = '#f4f7f9'; // Revert to the default color from CSS
    });
}

// Get all the list items
const socialMediaItems = document.querySelectorAll('ol li');

// Apply the hover handler to each list item
socialMediaItems.forEach(item => {
    handleButtonHover(item);
});