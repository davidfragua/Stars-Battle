// GLOBAL VARIABLES
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector("#splash-screen");
const startBtn = document.querySelector("#start-btn");
const gameOverScreen = document.querySelector("#gameOver-screen");
const restartBtn = document.querySelector("#restart-btn");
const homeBtn = document.querySelector("#home-btn");
const scoreGameOver = document.querySelector("#show-score");



let gameObj;



// FUNCTIONS

// Empezar el juego
const startGame = () => {
  // inicio el juego y oculto la splash screen
  startScreen.style.display = "none";
  canvas.style.display = "block";

  // nueva versión del juego
  gameObj = new Game();

  // ejecuta gameLoop
  gameObj.gameLoop();
};

// Volver a jugar
const restartGame = () => {
  gameOverScreen.style.display = "none";
  startGame();
};

// ir a la Home
const goToHome = () => {
  gameOverScreen.style.display = "none";
  startScreen.style.display = "flex";
};

// ADD EVENT LISTENER
// acciones botones
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
homeBtn.addEventListener("click", goToHome);

// movimiento jugador
window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    gameObj.playerObj.movePlayerRight();
  } else if (event.code === "ArrowLeft") {
    gameObj.playerObj.movePlayerLeft();
  } else if (event.code === "ArrowUp") {
    gameObj.playerObj.movePlayerUp();
  } else if (event.code === "ArrowDown") {
    gameObj.playerObj.movePlayerDown();
  } else if (event.code === "Space") {
    gameObj.shoot();
  }
});
