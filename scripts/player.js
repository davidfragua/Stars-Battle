class Player {
  constructor() {
    // propiedades del jugador
    this.player = new Image();
    this.player.src = "./images/player.png";
    this.x = 300;
    this.y = 700;
    this.w = 50;
    this.h = 70;
    this.speed = 25;

    // propiedades del escudo
    this.shield = new Image();
    this.shield.src = ("./images/shield.png")
    this.ejeX = this.x;
    this.ejeY = this.y - 40;
    this.w = 60;
    this.h = 70;
  }

  // dibujar escudo
  drawShield = () =>{
    ctx.drawImage(this.shield, this.ejeX, this.ejeY, this.w, this.h)
  }

  


  // dibujar jugador
  drawPlayer = () => {
    ctx.drawImage(this.player, this.x, this.y, this.w, this.h);
  };

  // movimiento jugador
  movePlayerRight = () => {
    this.x = this.x + this.speed;
    this.ejeX = this.ejeX + this.speed;
    // evitar que salga por la derecha
    if (this.x + this.w > canvas.width) {
      this.x = canvas.width - this.w;
    }
  };

  movePlayerLeft = () => {
    this.x = this.x - this.speed;
    this.ejeX = this.ejeX - this.speed;
    //evitar que salga por la izquierda
    if (this.x < 1) {
      this.x = 0;
    }
  };

  movePlayerUp = () => {
    this.y = this.y - this.speed;
    this.ejeY = this.ejeY - this.speed;
    // evitar que salga por arriba
    if (this.y < 1) {
      this.y = 0;
    }
  };

  movePlayerDown = () => {
    this.y = this.y + this.speed;
    this.ejeY = this.ejeY + this.speed;
    // evitar que salga por debajo
    if (this.y > canvas.height - this.h) {
      this.y = canvas.height - this.h;
    }
  };
}
