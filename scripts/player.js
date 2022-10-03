class Player {

    constructor() {
        // propiedades del jugador
        this.player = new Image();
        this.player.src = "./images/player.png";
        this.x = 275;
        this.y = 680;
        this.w = 50;
        this.h = 70;
        this.speed = 20;


    }


    // dibujar jugador
    drawPlayer = () =>{
        ctx.drawImage(this.player, this.x , this.y , this.w , this.h );
    } ;

    // movimiento jugador
    movePlayerRight = () => {
        this.x = this.x + this.speed;
    }

    movePlayerLeft = () => {
        this.x = this.x - this.speed;
    }

    movePlayerUp = () => {
        this.y = this.y - this.speed;
    }

    movePlayerDown = () => {
        this.y = this.y + this.speed;
    }


}