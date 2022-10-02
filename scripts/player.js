class Player {

    constructor() {
        // propiedades del jugador
        this.player = new Image();
        this.player.src = "./images/player.png";
        this.x = 275;
        this.y = 680;
        this.w = 50;
        this.h = 70;


    }


    // dibujar jugador
    drawPlayer = () =>{
        ctx.drawImage(this.player, this.x , this.y , this.w , this.h );
    } ;
}