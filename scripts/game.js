class Game {

    constructor() {
        // fondo
        this.fondo = new Image();
        this.fondo.src = "./images/background.png";
        // jugador
        this.playerObj = new Player();
        this.enemyObj = new Enemies();



    }






    // dibujar fondo
    drawFondo = () =>{
        ctx.drawImage(this.fondo, 0, 0, canvas.width, canvas.height);
    }




gameLoop = () =>{

    // 1. limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 2. acciones

    // 3. dibujado
    this.drawFondo();
    this.playerObj.drawPlayer();
    this.enemyObj.drawEnemy();

    // 4. control de la recursión
    requestAnimationFrame(this.gameLoop);


}

}