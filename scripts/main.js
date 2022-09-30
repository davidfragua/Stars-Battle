// GLOBAL VARIABLES
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector("#splash-screen");
const startBtn = document.querySelector("#start-btn");
const gameScreen = document.querySelector("#game-screen");
const gameOverScreen = document.querySelector("#gameOver-screen")

let gameObj;


// FUNCTIONS

const startGame = () =>{

    console.log("iniciando")
    // inicio el juego y oculto la splash screen
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    

    // nueva versión del juego
    gameObj = new Game();
  
    // ejecuta gameLoop
    gameObj.gameLoop();

}




// ADD EVENT LISTENER
// activo el juego al pinchar en Play
startBtn.addEventListener("click", startGame);