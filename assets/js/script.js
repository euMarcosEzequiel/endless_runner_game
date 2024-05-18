const canvas = document.getElementById('canvas').getContext('2d');

// estrutura do personagem
const characterX = 30;
var characterY = 125;
const characterWidth = 25;
const characterHeight = 25;

function character() {
    canvas.fillStyle = 'blue';
    canvas.fillRect(characterX, characterY, characterWidth, characterHeight);
}

// estrutura do obstaculo
var obstacleX = canvas.canvas.width;
const obstacleY = 130;
const obstacleWidth = 10;
const obstacleHeight = 20;
var speed = 7;

function obstacle() {
    canvas.fillStyle = 'red';
    canvas.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
}

function moveObstacle(){
    obstacleX -= speed;

    if(obstacleX + obstacleWidth < 0){
        obstacleX = canvas.canvas.width;
        score++;
    }
}

// estrutura da pontuação
var score = 0;

function showScore() {
    canvas.fillStyle = 'black';
    canvas.font = '10px Arial';
    canvas.fillText(`Score: ${score}`, 20, 20);
}


// estrutura do pulo do personagem
var jumping = false;

function jump() {
    if (!jumping) {
        jumping = true;
        if(characterY > canvas.canvas.height - characterHeight - 60){
            characterY -= 2;
        }
        let jumpInterval = setInterval(() => {
            if (characterY > canvas.canvas.height - characterHeight - 60) {
                characterY -= 2;
            } else {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (characterY < canvas.canvas.height - characterHeight) {
                        characterY += 2;
                    } else {
                        characterY = canvas.canvas.height - characterHeight;
                        jumping = false;
                        clearInterval(fallInterval);
                    }
                }, 10);
            }
        }, 10);
    }
}

// estrutura da colisão do personagem como o obstaculo
function collision() {
    if (
        characterX < obstacleX + obstacleWidth &&
        characterX + characterWidth > obstacleX &&
        characterY < obstacleY + obstacleHeight &&
        characterY + characterHeight > obstacleY
    ) {
        gameOver();
    }
}

// inicio do jogo
function start(){
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.fillStyle = 'black';
    canvas.font = '12px Arial';
    canvas.fillText('Welcome!', 120, 65);
    canvas.fillText('Press enter to start game.', 85, 90);
}

// começa o jogo
function play() {
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    
    character();
    obstacle();
    showScore();
    moveObstacle();
    collision();
    
    if (!GameOver) {
        requestAnimationFrame(play);
    }
}

// setando o game over 
var GameOver = false;

function gameOver() {
    GameOver = true;
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.fillStyle = 'black';
    canvas.font = '12px Arial';
    canvas.fillText('Game Over', 120, 50);
    canvas.fillText(`Score: ${score}`, 127, 70);
    canvas.fillText(`Press enter to play again!`, 85, 100);
}



// resetando o jogo
function resetGame() {
    score = 0;
    obstacleX = canvas.canvas.width;
    GameOver = false;
    play();
}

// adionando teclas para a interação com o jogo
document.addEventListener('keydown', function(event) {
    if(event.code === 'Enter' && GameOver == false){
        alert('Press the spacebar to jump over the obstacles');
        play();
    }
    if (event.code === 'Space') {
        jump();
    }
    if (event.code === 'Enter' && GameOver == true && !jumping) {
        resetGame();
    }
});

start();