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

function obstacle() {
    canvas.fillStyle = 'red';
    canvas.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
}

function randomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

function moveObstacle(){
    obstacleX -= randomNumber();

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
            if (characterY > canvas.canvas.height - characterHeight - 60) { // 50 é a altura do pulo
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

// setando o game over 
var isGameOver = false;

function gameOver() {
    isGameOver = true;
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.fillStyle = 'black';
    canvas.font = '12px Arial';
    canvas.fillText('Game Over', 120, 30);
    canvas.fillText(`Score: ${score}`, 125, 50);
    canvas.fillText(`Press enter to play again!`, 75, 70)
}

// resetando o jogo
function resetGame() {
    score = 0;
    obstacleX = canvas.canvas.width;
    isGameOver = false;
    play();
}

// estrutura do play
function play() {
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    
    character();
    obstacle();
    showScore();
    moveObstacle();
    collision();
    
    if (!isGameOver) {
        requestAnimationFrame(play);
    }
}

// acrescentando as keys (teclas) para jogar
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
    if (event.code === 'Enter' && !jumping) {
        resetGame();
    }
});

play();