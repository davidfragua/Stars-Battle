class Game {
  constructor() {
    // fondo
    this.fondo = new Image();
    this.fondo.src = "./images/background.png";
    // jugador
    this.playerObj = new Player();
    this.enemyObj = new Enemies();
    this.bulletObj = new Bullet();

    this.enemiesArr = [];
    this.bulletArr = [];

    this.frames = 0;

    this.isGameOn = true;
  }

  // dibujar fondo
  drawFondo = () => {
    ctx.drawImage(this.fondo, 0, 0, canvas.width, canvas.height);
  };

  // añadir enemigos
  addEnemy = () => {
    if (this.frames % 120 === 0) {
      let randomNum = Math.random() * canvas.width - 50;
      let randomXint = Math.floor(randomNum);

      let newEnemy = new Enemies(randomXint);
      this.enemiesArr.push(newEnemy);
    }
  };

  // colisión enemigo vs jugador
  playerEnemyCollision = () => {
    this.enemiesArr.forEach((eachEnemy) => {
      if (
        this.playerObj.x < eachEnemy.x + eachEnemy.w &&
        this.playerObj.x + this.playerObj.w > eachEnemy.x &&
        this.playerObj.y < eachEnemy.y + eachEnemy.h &&
        this.playerObj.h + this.playerObj.y > eachEnemy.y
      ) {
        // console.log("Colisión")
        this.gameOver();
      }
    });
  };

  // disparar
  shoot = () => {
      let positionX = this.playerObj.x;
      let positionY = this.playerObj.y;
      let newBullet = new Bullet(positionX, positionY);
      this.bulletArr.push(newBullet);
    
  };


  // colisión bala vs enemigos
  


  gameOver = () => {
    this.isGameOn = false;

    canvas.style.display = "none";

    gameOverScreen.style.display = "flex";
  };

  gameLoop = () => {
    this.frames = this.frames + 1;

    // 1. limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameOverScreen.style.display = "none";

    // 2. acciones
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.moveEnemy();
    });

    // movimiento bullet 
    this.bulletArr.forEach((eachBullet) => {
        eachBullet.moveBullet();
      });

    // movimiento bullets

    // 3. dibujado
    this.drawFondo();
    this.playerObj.drawPlayer();
    // this.enemyObj.drawEnemy();
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.drawEnemy();
    });

    this.addEnemy();
    this.playerEnemyCollision();

    this.bulletArr.forEach((eachBullet) =>{
        eachBullet.drawBullet();
    })

    // 4. control de la recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
