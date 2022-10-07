# STARS BATTLE

https://github.com/davidfragua/Stars-Battle

## Description:

Juego de naves espaciales en el que tendrás que eliminar a tus enemigos.


## Main Functionalities:

Disparar para ir destruyendo a tus enemigos para conseguir la mayor puntuación posible.

Hay 2 tipos de enemigos con diferentes velocidades de movimiento. 

Para ayudarte en el juego, puedes coger una Bola de Energía, que te permitirá activar un escudo protector.



## Backlog Functionalities:

Manejarás la nave principal y tu misión será destruir a los enemigos.

Hay 2 tipos de enemigos: 
- enemigos azules: se mueven a una velocidad baja.
- enemigos rojos/negros (Super Enemigos): se mueven a una velocidad mayor.

El nivel de dificultad se incrementa a los 5 segundos al aumentar las velocidades de ambos tipos de enemigos.

Además, aleatoriamente, se mostrarán una Bolas de Energía, que puedes capturar para activar un escudo protector para tu nave.

Ete escudo protector estará activa durante 4 segundos o hasta que colisiones con un enemigo.


## Project Structure:

- main.js
startGame()
restartGame()
goToHome()

- game.js
Game()
scoreGameOverScreen()
drawFondo()
drawFondo()
removeEnemy()
addSuperEnemies()
addEnergyBall()
playerEnemyCollision()
shoot()
bulletEnemyCollision()
bulletSuperEnemyCollision()
shieldEnemyCollision()
shieldSuperEnemyCollision()
showShield()
activateShield()
playerEnergyBallCollision()
raiseDifficultEnemies()
drawScore()
gameOver()
gameLoop()

- player.js
Player()
drawShield()
drawPlayer()
movePlayerRight()
movePlayerLeft()
movePlayerUp()
movePlayerDown()

- enemies.js
Enemies()
drawEnemy()
moveEnemy()

- superEnemies.js
superEnemies()
drawSuperEnemy()
moveSuperEnemy()

- bullet.js
Bullet()
drawBullet()
moveBullet()

- energyBall.js
EnergyBall()
drawEnergyBall()
moveEnergyBall()

## States and Transitions:
Habrá 3 pantallas:
- Start screen
Pantalla de presntación con botón de "Play"
- Game screen
Pantalla del juego.
- GameOver screen
Pantalla de fin de juego con la puntuación y botón de de "Volver a jugar" y "Home".


## Extra Links:

Tareas - Trello:
https://trello.com/b/RXx5KKap/stars-battle

Demo del juego:
https://github.com/davidfragua/Stars-Battle