const player = document.querySelector(".govidan");
const arrow = document.querySelector(".arrow");
const scoreDisplay = document.querySelector(".score");
const restartBtn = document.querySelector(".restart-btn");

let arrowX = 850;
let arrowY = 100;
let govidanY = 0;
let score = 0;
let isGameOver = false;
let gameLoop = setInterval(movearrow, 19);

function movearrow() {
    if (isGameOver) return;

    arrowX -= 20;
    
    const a = arrow.getBoundingClientRect();
    const p = player.getBoundingClientRect();

    if (p.left < a.right && p.right > a.left && a.top < p.bottom && a.bottom > p.top) {
        gameOver();
        return;
    }

    if (arrowX < 0) {
        arrowX = 850;
        arrowY = Math.floor(Math.random() * 200);
        
        score += 10;
        if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
    }

    arrow.style.left = arrowX + "px";
    arrow.style.top = arrowY + "px";
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    if (restartBtn) restartBtn.style.display = "block";
    alert(`Game Over! Final Score: ${score}`);
}

function restartGame() {
    score = 0;
    arrowX = 850;
    arrowY = 100;
    govidanY = 0;
    isGameOver = false;

    if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
    if (restartBtn) restartBtn.style.display = "none";

    player.style.top = govidanY + "px";
    arrow.style.left = arrowX + "px";
    arrow.style.top = arrowY + "px";

    clearInterval(gameLoop);
    gameLoop = setInterval(movearrow, 19);
}

if (restartBtn) {
    restartBtn.addEventListener("click", restartGame);
}

document.addEventListener("keydown", (e) => {
    if (isGameOver) return;

    if (e.key === "ArrowDown") {
        govidanY += 10;
    }
    if (e.key === "ArrowUp") {
        govidanY -= 10;
    }
    player.style.top = govidanY + "px";
});


