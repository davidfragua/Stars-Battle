class Game {

    constructor() {
        // fondo
        this.fondo = new Image();
        this.fondo.src = "./images/background.png";
        // jugador
        this.playerObj = new Player();
        this.enemyObj = new Enemies();

        this.enemiesArr = [];
        this.frames = 0;

        this.isGameOn = true;
    
    }


    // dibujar fondo
    drawFondo = () =>{
        ctx.drawImage(this.fondo, 0, 0, canvas.width, canvas.height);
    }

    // añadir enemigos
    addEnemy = () =>{
        if (this.frames % 120 === 0){

            let randomNum = Math.random() * canvas.width - 50;
            let randomXint = Math.floor(randomNum)

            let newEnemy = new Enemies(randomXint)
            this.enemiesArr.push(newEnemy);
        }
    }

        // colisión enemigo vs jugador
    playerEnemyCollision = () =>{

        this.enemiesArr.forEach( (eachEnemy) =>{
            if (
                this.playerObj.x < eachEnemy.x + eachEnemy.w &&
                this.playerObj.x + this.playerObj.w > eachEnemy.x &&
                this.playerObj.y < eachEnemy.y + eachEnemy.h &&
                this.playerObj.h + this.playerObj.y > eachEnemy.y
              ) { 
                // console.log("Colisión") 
                this.gameOver()
               
              }
            })
    
    }


    gameOver = () =>{
        this.isGameOn = false;

        canvas.getElementsByClassName.display = "none";
    }


gameLoop = () =>{

    this.frames = this.frames + 1;

    // 1. limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 2. acciones
     // this.enemyObj.moveEnemy();
    this.enemiesArr.forEach((eachEnemy) => {
        eachEnemy.moveEnemy()
      })


    // 3. dibujado
    this.drawFondo();
    this.playerObj.drawPlayer();
    // this.enemyObj.drawEnemy();
    this.enemiesArr.forEach((eachEnemy) =>{
        eachEnemy.drawEnemy()
    })
   
    this.addEnemy();
    this.playerEnemyCollision();

    // 4. control de la recursión
    if (this.isGameOn === true){
    requestAnimationFrame(this.gameLoop);
    }


}

}