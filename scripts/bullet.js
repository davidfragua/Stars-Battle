class Bullet {
  constructor(xParam, yParam) {
    this.bullet = new Image();
    this.bullet.src = "./images/bullet.png";
    this.x = xParam;
    this.y = yParam;
    this.w = 10;
    this.h = 20;
    this.speed = 40;
  }

  drawBullet = () => {
    ctx.drawImage(this.bullet, this.x, this.y, this.w, this.h);
  };

  moveBullet = () => {
    this.y = this.y - this.speed;
  };
  
}
