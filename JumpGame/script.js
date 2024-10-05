const character = document.getElementById("character");
const blocks = [document.getElementById("block"), document.getElementById("block2"), document.getElementById("block3")];
const pauseButton = document.getElementById("botaopause");
let counter = 0;
let isJumping = false;
let isPaused = false;
let checkDead;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !isPaused) {
        jump();
    } else if (event.code === "ArrowLeft" && !isPaused) {
        moveLeft();
    } else if (event.code === "ArrowRight" && !isPaused) {
        moveRight();
    }
});

// Função para pular
function jump() {
    if (!isJumping) {
        isJumping = true;
        character.classList.add("animate");
        setTimeout(() => {
            character.classList.remove("animate");
            isJumping = false;
        }, 500);
    }
}

function moveLeft() {
    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (characterLeft > 0) {
        character.style.left = characterLeft - 20 + "px"; 
    }
}

function moveRight() {
    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    const gameWidth = parseInt(window.getComputedStyle(document.querySelector('.game')).getPropertyValue("width"));
    if (characterLeft < gameWidth - 20) { 
        character.style.left = characterLeft + 20 + "px"; 
    }
}

function collision(block) { 
    const characterRect = character.getBoundingClientRect(); 
    const blockRect = block.getBoundingClientRect(); 

    return (
        blockRect.left < characterRect.right &&
        blockRect.right > characterRect.left &&
        blockRect.top < characterRect.bottom &&
        blockRect.bottom > characterRect.top
    );
}

function startGame() {
    checkDead = setInterval(() => {
        if (!isPaused) {
            if (blocks.some(collision)) {
                blocks.forEach(block => block.style.animation = "none");
                alert("Fim de jogo. Pontuação: " + Math.floor(counter / 100));
                counter = 0;
                blocks.forEach((block, index) => block.style.animation = `block ${3 + index * 2}s infinite linear`); 

            } else {
                counter++;
                document.getElementById("scoreSpan").innerText = Math.floor(counter / 100);
            }
        }
    }, 10);
}

function togglePause() {
    isPaused = !isPaused;
    const playState = isPaused ? "paused" : "running";
    blocks.forEach(block => block.style.animationPlayState = playState);
    pauseButton.innerText = isPaused ? "Continuar" : "Pausar";
}

pauseButton.addEventListener("click", togglePause);

startGame();
