class superEnemies {
  constructor(xParam) {
    // propiedades del enemigo
    this.superEnemy = new Image();
    this.superEnemy.src = "./images/enemigoRojo.png";
    this.x = xParam;
    this.y = 100;
    this.w = 50;
    this.h = 70;
    this.speed = 4.5;
  }

  // dibujar enemigo
  drawSuperEnemy = () => {
    ctx.drawImage(this.superEnemy, this.x, this.y, this.w, this.h);
  };

  // movimiento de los enemigos
  moveSuperEnemy = () => {
    this.y = this.y + this.speed;
  };
}
