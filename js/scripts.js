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

// Function to create a snowflake
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.width = getRandom(5, 20) + 'px';
    snowflake.style.height = snowflake.style.width;
    snowflake.style.left = getRandom(0, window.innerWidth) + 'px';
    snowflake.style.animationDuration = getRandom(5, 15) + 's';
    document.getElementById('snowfall-container').appendChild(snowflake);

    // Remove the snowflake after the animation ends
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

// Function to create multiple snowflakes
function createSnowfall() {
    setInterval(createSnowflake, 500); // Adjust the interval as needed
}

// Start the snowfall when the window loads
window.onload = createSnowfall;
