class Game {
  constructor() {
    // fondo
    this.fondo = new Image();
    this.fondo.src = "./images/background.png";
    // jugador
    this.playerObj = new Player();
    // this.enemyObj = new Enemies();
    // this.bulletObj = new Bullet();
    

    this.enemiesArr = [];
    this.bulletArr = [];
    this.superEnemiesArr = [];

    this.frames = 0;

    this.score = 0;

    this.soundShoot = new Audio("./sounds/Fire 1.mp3");
    this.soundGameOver = new Audio("./sounds/Game Over.mp3");
    this.soundExplosion = new Audio("./sounds/explosion.mp3");

    this.isGameOn = true;
  }

  // dibujar fondo
  drawFondo = () => {
    ctx.drawImage(this.fondo, 0, 0, canvas.width, canvas.height);
  };

  // añadir enemigos
  addEnemy = () => {
    if (this.frames % 60 === 0) {
      let randomNum = Math.random() * (canvas.width - 50);
      let randomXint = Math.floor(randomNum);

      let newEnemy = new Enemies(randomXint);
      this.enemiesArr.push(newEnemy);
    }
  };

  // quitar del array los enemigos que se escapan debajo del canvas
  removeEnemy = () => {
    this.enemiesArr.forEach((eachEnemy, i) => {
      if (eachEnemy.y > canvas.height) {
        this.enemiesArr.splice(i, 1);
      }
    });
  };

  // añadir super Enemigos
  addSuperEnemies = () => {
    if (this.frames % 90 === 0) {
      let randomNum = Math.random() * (canvas.width - 50);
      let randomXint = Math.floor(randomNum);

      let newSuperEnemy = new superEnemies(randomXint);
      this.superEnemiesArr.push(newSuperEnemy);
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
        this.gameOver();
      }
    });
  };

  // colisión Super Enemigo vs jugador
  playerSuperEnemyCollision = () => {
    this.superEnemiesArr.forEach((eachSuperEnemy) => {
      if (
        this.playerObj.x < eachSuperEnemy.x + eachSuperEnemy.w &&
        this.playerObj.x + this.playerObj.w > eachSuperEnemy.x &&
        this.playerObj.y < eachSuperEnemy.y + eachSuperEnemy.h &&
        this.playerObj.h + this.playerObj.y > eachSuperEnemy.y
      ) {
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
          eachBullet.x < eachEnemy.x + eachEnemy.w &&
          eachBullet.x + eachBullet.w > eachEnemy.x &&
          eachBullet.y < eachEnemy.y + eachEnemy.h &&
          eachBullet.h + eachBullet.y > eachEnemy.y
        ) {
          this.bulletArr.splice(i, 1);
          this.enemiesArr.splice(j, 1);
          this.score++;
          this.soundExplosion.play();
        }
      });
    });
  };

  // colisión bala vs Super Enemigos
  bulletSuperEnemyCollision = () => {
    this.bulletArr.forEach((eachBullet, i) => {
      this.superEnemiesArr.forEach((eachSuperEnemy, j) => {
        if (
          eachBullet.x < eachSuperEnemy.x + eachSuperEnemy.w &&
          eachBullet.x + eachBullet.w > eachSuperEnemy.x &&
          eachBullet.y < eachSuperEnemy.y + eachSuperEnemy.h &&
          eachBullet.h + eachBullet.y > eachSuperEnemy.y
        ) {
          this.bulletArr.splice(i, 1);
          this.superEnemiesArr.splice(j, 1);
          this.score++;
          this.soundExplosion.play();
        }
      });
    });
  };



// activar-dibujar escudo
// ctx.thisplayerObj.drawShield.style = "none";



  // Score
  drawScore = ()=>{
    ctx.font = "bold 30px Arial";
    let showScore = `SCORE: ${this.score}`;
    ctx.fillText(showScore, canvas.width * 0.4, 50);
    ctx.fillStyle = "white";
  }


  
  // Fin del juego
  gameOver = () => {
    this.isGameOn = false;

    canvas.style.display = "none";

    gameOverScreen.style.display = "flex";

    this.soundGameOver.play();
  };

  // Juego
  gameLoop = () => {
    this.frames = this.frames + 1;

    // 1. limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameOverScreen.style.display = "none";

    // 2. acciones
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.moveEnemy();
    });

    this.superEnemiesArr.forEach((eachSuperEnemy) => {
      eachSuperEnemy.moveSuperEnemy();
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

    // se activa el escudo si el score es divisible entre 5
    if (this.score % 5 === 0){
        this.playerObj.drawShield();
    }
   
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.drawEnemy();
    });

    this.superEnemiesArr.forEach((eachSuperEnemy) => {
      eachSuperEnemy.drawSuperEnemy();
    });

    this.addEnemy();
    this.playerEnemyCollision();
    this.bulletEnemyCollision();
    this.addSuperEnemies();
    this.playerSuperEnemyCollision();
    this.bulletSuperEnemyCollision();

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
