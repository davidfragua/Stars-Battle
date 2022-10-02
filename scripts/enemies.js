class Enemies {

    constructor() {
        // propiedades del enemigo
        this.enemy = new Image();
        this.enemy.src = "./images/enemigoAzul2.png";
        this.x = 275;
        this.y = 100;
        this.w = 50;
        this.h = 70;


    }


    // dibujar enemigo
    drawEnemy = () =>{
        ctx.drawImage(this.enemy, this.x , this.y , this.w , this.h );
    } ;
}