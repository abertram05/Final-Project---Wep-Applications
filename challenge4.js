/* 
-------------------------------------------------------
                   Start of Challenge 4
------------------------------------------------------- 
*/

// variables
let currentRound = 1;
let correctTile = null;
let mistakes4 = 0;
let timer4 = null;
let timeLeft4 = 10;

// html elements
const grid = document.getElementById("grid");
const roundCounter = document.getElementById("roundCounter");
const timerDisplay4 = document.getElementById("timerDisplay4");
const mistakeCounter4 = document.getElementById("mistakeCounter4");
const resultMessage4 = document.getElementById("resultMessage4");

// starts the round
startRound4();

// function to start the round
function startRound4() {
    if (currentRound > 10) {
        resultMessage4.textContent = "You cracked all 10 locks! Challenge complete!";
        return;
    }

    // resets the grid
    grid.innerHTML = "";
    resultMessage4.textContent = "";

    roundCounter.textContent = `Round ${currentRound} / 10`;
    mistakeCounter4.textContent = `Mistakes: ${mistakes4} / 3`;

    // random tile 0-15
    correctTile = Math.floor(Math.random() * 16);

    // creates 16 tiles
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement("button");
        tile.textContent = i + 1;
        tile.style.margin = "5px";
        tile.style.width = "60px";
        tile.style.height = "60px";
        tile.dataset.index = i;

        tile.addEventListener("click", () => tileClicked(i));
        grid.appendChild(tile);
    }

    // reset timer
    timeLeft4 = 10;
    updateTimer4();
    clearInterval(timer4);
    timer4 = setInterval(runTimer4, 1000);
}

// timer
function runTimer4() {
    timeLeft4--;
    updateTimer4();

    if (timeLeft4 <= 0) {
        clearInterval(timer4);
        processMistake4("Time expired!");
    }
}

function updateTimer4() {
    timerDisplay4.textContent = `Time Left: ${timeLeft4}s`;
}

// handles the clicks
function tileClicked(index) {
    clearInterval(timer4);

    // correct choice
    if (index === correctTile) {
        resultMessage4.textContent = "Correct!";
        currentRound++;
        setTimeout(startRound4, 600);
        return;
    }

    // wrong choice
    processMistake4("Wrong tile!");
}

// processes the mistakes 
function processMistake4(message) {
    mistakes4++; 
    mistakeCounter4.textContent = `Mistakes: ${mistakes4} / 3`;
    resultMessage4.textContent = message;

    if (mistakes4 >= 3) {
        resultMessage4.textContent = "Too many mistakes! Restarting...";
        setTimeout(restartChallenge4, 1500);
        return;
    }
    currentRound++;
    setTimeout(startRound4, 800);
}

// restarts the challenge
function restartChallenge4() {
    currentRound = 1;
    mistakes4 = 0;
    startRound4();
}