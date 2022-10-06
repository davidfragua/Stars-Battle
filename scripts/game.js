class Game {
  constructor() {
    // fondo
    this.fondo = new Image();
    this.fondo.src = "./images/background.png";
    // jugador
    this.playerObj = new Player();

    // enemigos
    this.enemiesArr = [];
    this.superEnemiesArr = [];

    // bala
    this.bulletArr = [];

    // escudo
    this.shieldActive = false;

    // Energy Ball
    this.energyBallArr = [];

    // frames
    this.frames = 0;

    // score
    this.score = 0;

    // sonidos
    this.soundShoot = new Audio("./sounds/fire.mp3");
    this.soundGameOver = new Audio("./sounds/game-over.mp3");
    this.soundExplosion = new Audio("./sounds/explosion.mp3");
    this.soundShieldCollision = new Audio("./sounds/shield-collision.mp3");
    this.soundBallEnergy = new Audio("./sounds/ball-energy.flac");

    // activar juego
    this.isGameOn = true;
  }

  // mostrar score en Game Over screen
  scoreGameOverScreen = () => {
    scoreGameOver.innerHTML = `${this.score}`;
  };

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

  // añadir Super Enemigos
  addSuperEnemies = () => {
    if (this.frames % 90 === 0) {
      let randomNum = Math.random() * (canvas.width - 50);
      let randomXint = Math.floor(randomNum);

      let newSuperEnemy = new superEnemies(randomXint);
      this.superEnemiesArr.push(newSuperEnemy);
    }
  };

  // añadir Energy Ball
  addEnergyBall = () => {
    if (this.frames % 300 === 0) {
      let randomNum = Math.random() * (canvas.width - 50);
      let randomXint = Math.floor(randomNum);

      let newEnergyBall = new EnergyBall(randomXint);
      this.energyBallArr.push(newEnergyBall);
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

  //   colisión entre escudo y enemigo
  shieldEnemyCollision = () => {
    if (this.shieldActive === true) {
      this.enemiesArr.forEach((eachEnemy, i) => {
        if (
          this.playerObj.shieldX < eachEnemy.x + eachEnemy.w &&
          this.playerObj.shieldX + this.playerObj.shieldW > eachEnemy.x &&
          this.playerObj.shieldY < eachEnemy.y + eachEnemy.h &&
          this.playerObj.shieldH + this.playerObj.shieldY > eachEnemy.y
        ) {
          this.enemiesArr.splice(i, 1);
          this.score++;
          this.soundShieldCollision.play();
          this.shieldActive = false;
        }
      });
    }
  };
  //   colisión entre escudo y Super Enemigo
  shieldSuperEnemyCollision = () => {
    if (this.shieldActive === true) {
      this.superEnemiesArr.forEach((eachSuperEnemy, i) => {
        if (
          this.playerObj.shieldX < eachSuperEnemy.x + eachSuperEnemy.w &&
          this.playerObj.shieldX + this.playerObj.shieldW > eachSuperEnemy.x &&
          this.playerObj.shieldY < eachSuperEnemy.y + eachSuperEnemy.h &&
          this.playerObj.shieldH + this.playerObj.shieldY > eachSuperEnemy.y
        ) {
          this.superEnemiesArr.splice(i, 1);
          this.score++;
          this.soundShieldCollision.play();
          this.shieldActive = false;
        }
      });
    }
  };

  // mostrar escudo y activar
  showShield = () => {
    if (this.shieldActive === true) {
      this.playerObj.drawShield();
    }
  };

  // activar escudo
  activateShield = () => {
    this.shieldActive = true;
    setTimeout(() => {
      this.shieldActive = false;
    }, 4000);
  };

  // colisión jugador vs Energy Ball
  playerEnergyBallCollision = () => {
    this.energyBallArr.forEach((eachEnergyBall, i) => {
      if (
        this.playerObj.x < eachEnergyBall.x + eachEnergyBall.w &&
        this.playerObj.x + this.playerObj.w > eachEnergyBall.x &&
        this.playerObj.y < eachEnergyBall.y + eachEnergyBall.h &&
        this.playerObj.h + this.playerObj.y > eachEnergyBall.y
      ) {
        this.energyBallArr.splice(i, 1);
        this.soundBallEnergy.play();
        this.activateShield();
      }
    });
  };

  // incrementar dificultad enemigos
  raiseDifficultEnemies = () => {
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.speed = 5;
    });
  };

  // incrementar dificultad Super Enemigos
  raiseDifficultSuperEnemies = () => {
    this.superEnemiesArr.forEach((eachSuperEnemy) => {
      eachSuperEnemy.speed = 6.5;
    });
  };

  // //! FUNCIÓN INTERVALO
  // shieldRandom = () => {
  //   setInterval(() => {
  //     this.playerObj.drawShield();
  //     this.shieldActive = true;
  //   }, 3000);
  // };

  // Score
  drawScore = () => {
    ctx.font = "bold 30px Verdana";
    let showScore = `SCORE: ${this.score}`;
    ctx.fillText(showScore, canvas.width * 0.4, 50);
    ctx.fillStyle = "white";
  };

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
    // movimiento enemigo
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.moveEnemy();
    });

    // movimiento Super Enemigo
    this.superEnemiesArr.forEach((eachSuperEnemy) => {
      eachSuperEnemy.moveSuperEnemy();
    });

    // movimiento bullet
    this.bulletArr.forEach((eachBullet) => {
      eachBullet.moveBullet();
    });

    // movimiento Energy Ball
    this.energyBallArr.forEach((eachEnergyBall) => {
      eachEnergyBall.moveEnergyBall();
    });

    // vaciar array de enemigos
    this.removeEnemy();

    // incrementar dificultad Enemigos
    setInterval(this.raiseDifficultEnemies, 5000);

    // incrementar dificultad Super Enemigos
    setInterval(this.raiseDifficultSuperEnemies, 5000);

    // 3. dibujado
    // dibujar fondo
    this.drawFondo();

    // dibujar jugador
    this.playerObj.drawPlayer();

    // dibujar bala
    this.bulletArr.forEach((eachBullet) => {
      eachBullet.drawBullet();
    });

    // dibujar enemigo
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.drawEnemy();
    });

    // dibujar Super Enemigo
    this.superEnemiesArr.forEach((eachSuperEnemy) => {
      eachSuperEnemy.drawSuperEnemy();
    });

    // dibujar Energy Ball
    this.energyBallArr.forEach((eachEnergyBall) => {
      eachEnergyBall.drawEnergyBall();
    });

    //
    this.showShield();

    // añadir enemigos
    this.addEnemy();
    this.addSuperEnemies();

    // añadir Energu Ball
    this.addEnergyBall();

    // colisiones
    this.playerEnemyCollision();
    this.bulletEnemyCollision();

    this.playerSuperEnemyCollision();
    this.bulletSuperEnemyCollision();

    this.shieldEnemyCollision();
    this.shieldSuperEnemyCollision();

    this.playerEnergyBallCollision();

    //! activar-dibujar escudo
    // se activa el escudo si el score es divisible entre 3
    // if (this.score > 0 && this.score % 3 === 0) {
    //   this.playerObj.drawShield();
    //   this.shieldActive = true;
    // }

    // dibujar Score
    this.drawScore();

    // dibujar Score en Game Over screen
    this.scoreGameOverScreen();

    // 4. control de la recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
