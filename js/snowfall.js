document.addEventListener('DOMContentLoaded', function () {
    const snowflakes = document.querySelectorAll('.snowflake');

    function animateSnowflakes() {
        snowflakes.forEach(function (snowflake) {
            const fallSpeed = parseFloat(snowflake.getAttribute('data-fallspeed')) || 2.0; // Adjust the fall speed as needed
            const rotateSpeed = parseFloat(snowflake.getAttribute('data-rotatespeed')) || 0.5; // Adjust the rotation speed as needed

            // Move the snowflake vertically
            const translateY = snowflake.offsetTop + fallSpeed;
            snowflake.style.transform = `translateY(${translateY}px) rotate(${rotateSpeed}deg)`;

            // Reset the snowflake position when it goes below the viewport
            if (translateY > window.innerHeight) {
                snowflake.style.transform = `translateY(-20px) rotate(${rotateSpeed}deg)`;
            }
        });

        // Repeat the animation
        requestAnimationFrame(animateSnowflakes);
    }

    // Start the animation
    animateSnowflakes();
});
