class EnergyBall {
    constructor(xParam) {
      // propiedades de Energy Ball
      this.ball = new Image();
      this.ball.src = "./images/energyball.png";
      this.x = xParam;
      this.y = 100;
      this.w = 40;
      this.h = 40;
      this.speed = 2.5;
    }
  
    // dibujar Energy Ball
    drawEnergyBall = () => {
      ctx.drawImage(this.ball, this.x, this.y, this.w, this.h);
    };
  
    // movimiento de Energy Ball
    moveEnergyBall = () => {
      this.y = this.y + this.speed;
    };
  }