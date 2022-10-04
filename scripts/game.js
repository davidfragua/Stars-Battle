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

    this.score = 0;

    this.soundShoot = new Audio("./sounds/Fire 1.mp3");
    this.soundGameOver = new Audio("./sounds/Game Over.mp3");
    this.soundExplosion = new Audio("./sounds/explosion.wav");

    this.isGameOn = true;
  }

  // dibujar fondo
  drawFondo = () => {
    ctx.drawImage(this.fondo, 0, 0, canvas.width, canvas.height);
  };

  // añadir enemigos
  addEnemy = () => {
    if (this.frames % 90 === 0) {
      let randomNum = Math.random() * canvas.width - 50;
      let randomXint = Math.floor(randomNum);

      let newEnemy = new Enemies(randomXint);
      this.enemiesArr.push(newEnemy);
    }
  };

  // quitar del array los enemigos que se escapan
  removeEnemy = () => {
    this.enemiesArr.forEach((eachEnemy, i) => {
      if (eachEnemy.y > canvas.height) {
        this.enemiesArr.splice(i, 1);
      }
    });
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
    let newBullet = new Bullet(positionX + 23, positionY + 10);
    this.bulletArr.push(newBullet);
    this.soundShoot.play();
  };

  // colisión bala vs enemigos
  bulletEnemyCollision = () => {
    this.bulletArr.forEach((eachBullet, i) => {
      this.enemiesArr.forEach((eachEnemy, j) => {
        if (
          this.bulletArr[i].x < this.enemiesArr[j].x + this.enemiesArr[j].w &&
          this.bulletArr[i].x + this.bulletArr[i].w > this.enemiesArr[j].x &&
          this.bulletArr[i].y < this.enemiesArr[j].y + this.enemiesArr[j].h &&
          this.bulletArr[i].h + this.bulletArr[i].y > this.enemiesArr[j].y
        ) {
          this.bulletArr.splice(i, 1);
          this.enemiesArr.splice(j, 1);
          this.score++;
          this.soundExplosion.play();
        }
      });
    });
  };

  drawScore = () => {
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "white";
    let scoreStr = `SCORE: ${this.score}`;
    ctx.fillText(scoreStr, canvas.width * 0.4, 50);
  };

  gameOver = () => {
    this.isGameOn = false;

    canvas.style.display = "none";

    gameOverScreen.style.display = "flex";

    this.soundGameOver.play();
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

    // vaciar array de enemigos
    this.removeEnemy();

    // 3. dibujado
    this.drawFondo();
    this.playerObj.drawPlayer();
    // this.enemyObj.drawEnemy();
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.drawEnemy();
    });

    this.addEnemy();
    this.playerEnemyCollision();
    this.bulletEnemyCollision();

    this.bulletArr.forEach((eachBullet) => {
      eachBullet.drawBullet();
    });

    this.drawScore();
    // 4. control de la recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
