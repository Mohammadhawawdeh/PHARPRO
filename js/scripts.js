/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
<script>
  window.location.href = "http://www.pharpro.co/new-page.html";
</script>
// Function to generate a random number between min and max
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Generate and append snowflakes to the container
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = `${Math.random() * 100}vw`;
    document.getElementById('snowfall-container').appendChild(snowflake);
}

// Generate a specified number of snowflakes
function createSnowfall(numberOfSnowflakes) {
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }
}

// Set the number of snowflakes you want
const numberOfSnowflakes = 50;

// Create the snowfall effect
createSnowfall(numberOfSnowflakes);
