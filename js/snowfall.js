document.addEventListener('DOMContentLoaded', function () {
    const snowflakes = document.querySelectorAll('.snowflake');

    function animateSnowflakes() {
        snowflakes.forEach(function (snowflake) {
            const fallSpeed = parseFloat(snowflake.getAttribute('data-fallspeed')) || 2.0;
            const rotateSpeed = (Math.random() * 1) + 0.5; // Random rotation speed between 0.5 and 1.5

            const translateY = snowflake.offsetTop + fallSpeed;
            snowflake.style.transform = `translateY(${translateY}px) rotate(${rotateSpeed}deg)`;

            if (translateY > window.innerHeight) {
                snowflake.style.transform = `translateY(-20px) rotate(${rotateSpeed}deg)`;
            }
        });

        requestAnimationFrame(animateSnowflakes);
    }

    animateSnowflakes();
});
