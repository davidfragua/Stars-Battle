// GLOBAL VARIABLES
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector("#splash-screen");
const startBtn = document.querySelector("#start-btn");
const gameOverScreen = document.querySelector("#gameOver-screen")

let gameObj;


// FUNCTIONS

const startGame = () =>{

    console.log("iniciando")
    // inicio el juego y oculto la splash screen
    startScreen.style.display = "none";
    canvas.style.display = "block";
    

    // nueva versión del juego
    gameObj = new Game();
  
    // ejecuta gameLoop
    gameObj.gameLoop();

}




// ADD EVENT LISTENER
// activo el juego al pinchar en Play
startBtn.addEventListener("click", startGame);

// movimiento jugador
window.addEventListener("keydown", (event)=>{
    if (event.code === "ArrowRight") {
       gameObj.playerObj.movePlayerRight()
    } else if (event.code === "ArrowLeft") {
        gameObj.playerObj.movePlayerLeft()
    } else if (event.code === "ArrowUp") {
        gameObj.playerObj.movePlayerUp()
    } else if (event.code === "ArrowDown") {
        gameObj.playerObj.movePlayerDown()
    }
})
    

    
