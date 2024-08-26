document.addEventListener("DOMContentLoaded", function () {
    const gameArea = document.getElementById("game-area");
    const startButton = document.getElementById("start-button");
    const scoreDisplay = document.getElementById("score");
    let score = 0;
    let gameInterval;

    const targetTypes = [
        { color: "#ff0075", size: 50, points: 1 },   // Regular target
        { color: "#00ff75", size: 30, points: 3 },   // Smaller, more points
        { color: "#ffcc00", size: 70, points: 2 }    // Bigger, fewer points
    ];

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
        const targetType = targetTypes[Math.floor(Math.random() * targetTypes.length)];
        target.classList.add("target");
        target.style.width = targetType.size + "px";
        target.style.height = targetType.size + "px";
        target.style.backgroundColor = targetType.color;
        target.style.top = Math.random() * (gameArea.clientHeight - targetType.size) + "px";
        target.style.left = Math.random() * (gameArea.clientWidth - targetType.size) + "px";

        gameArea.appendChild(target);

        target.addEventListener("click", () => {
            score += targetType.points;
            scoreDisplay.textContent = "Score: " + score;
            target.remove();
        });

        setTimeout(() => {
            target.remove();
        }, speed);
    }

    function stopGame() {
        clearInterval(gameInterval);
        startButton.disabled = false;
        gameArea.innerHTML = "";
        checkHighScore();
    }

    setTimeout(stopGame, 30000);

    function checkHighScore() {
        const highScore = localStorage.getItem('highScore') || 0;
        if (score > highScore) {
            localStorage.setItem('highScore', score);
            alert("New High Score: " + score);
        } else {
            alert("Your Score: " + score + "\nHigh Score: " + highScore);
        }
    }
});
