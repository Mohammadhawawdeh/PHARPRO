document.addEventListener('DOMContentLoaded', function () {
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
});
