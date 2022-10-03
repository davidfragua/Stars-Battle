class Enemies {
  constructor(xParam) {
    // propiedades del enemigo
    this.enemy = new Image();
    this.enemy.src = "./images/enemigoAzul2.png";
    this.x = xParam;
    this.y = 100;
    this.w = 50;
    this.h = 70;
    this.speed = 3;
  }

  // dibujar enemigo
  drawEnemy = () => {
    ctx.drawImage(this.enemy, this.x, this.y, this.w, this.h);
  };

  // movimiento de los enemigos
  moveEnemy = () => {
    this.y = this.y + this.speed;
  };
}
