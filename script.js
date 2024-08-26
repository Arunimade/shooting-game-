document.addEventListener("DOMContentLoaded", function () {
    const gameArea = document.getElementById("game-area");
    const startButton = document.getElementById("start-button");
    const scoreDisplay = document.getElementById("score");
    let score = 0;
    let gameInterval;

    startButton.addEventListener("click", startGame);

    function startGame() {
        score = 0;
        scoreDisplay.textContent = "Score: 0";
        startButton.disabled = true;

        // Load settings from settings.json
        fetch("settings.json")
            .then(response => response.json())
            .then(settings => {
                gameInterval = setInterval(() => spawnTarget(settings.targetSpeed), 1000);
            });
    }

    function spawnTarget(speed) {
        const target = document.createElement("div");
        target.classList.add("target");
        target.style.top = Math.random() * (gameArea.clientHeight - 50) + "px";
        target.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";

        gameArea.appendChild(target);

        target.addEventListener("click", () => {
            score++;
            scoreDisplay.textContent = "Score: " + score;
            target.remove();
        });

        // Remove target after a certain time
        setTimeout(() => {
            target.remove();
        }, speed);
    }

    // Stop the game and reset
    function stopGame() {
        clearInterval(gameInterval);
        startButton.disabled = false;
        gameArea.innerHTML = "";
    }

    // Stop the game after 30 seconds
    setTimeout(stopGame, 30000);
});
