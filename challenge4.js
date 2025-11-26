/* 
-------------------------------------------------------
                   Start of Challenge 4
------------------------------------------------------- 
*/

// game variables
let currentRound = 1;       // current round number
let correctTile = null;     // the index of the correct tile
let mistakes4 = 0;          // number of mistakes
let timer4 = null;          // interval timer for the countdown 
let timeLeft4 = 10;         // seconds left per round 

// html elements
const grid = document.getElementById("grid");
const roundCounter = document.getElementById("roundCounter");
const timerDisplay4 = document.getElementById("timerDisplay4");
const mistakeCounter4 = document.getElementById("mistakeCounter4");
const resultMessage4 = document.getElementById("resultMessage4");
const tileOutput = document.getElementById("tileOutput");

// starts the round immediately
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
    tileOutput.textContent = "";

    roundCounter.textContent = `Round ${currentRound} / 10`;
    mistakeCounter4.textContent = `Mistakes: ${mistakes4} / 10`;

    // randomly chooses correct tile 0-15
    correctTile = Math.floor(Math.random() * 16);

    // creates 16 tiles
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement("button");
        tile.textContent = i + 1;
        tile.dataset.index = i;
        tile.addEventListener("click", () => tileClicked(i));
        grid.appendChild(tile);
    }

    // resets timer for this round
    timeLeft4 = 10;
    updateTimer4();
    clearInterval(timer4);
    timer4 = setInterval(runTimer4, 1000);
}

// countdown timer logic
function runTimer4() {
    timeLeft4--;
    updateTimer4();

    if (timeLeft4 <= 0) {
        clearInterval(timer4);
        processMistake4("Time expired!");
    }
}

// updates timer display
function updateTimer4() {
    timerDisplay4.textContent = `Time Left: ${timeLeft4}s`;
}

// handles the clicks
function tileClicked(index) {
    clearInterval(timer4);
    const tileButtons = grid.querySelectorAll("button");
    const clickedTile = tileButtons[index];

    // shows clicked tile number
    tileOutput.textContent = `Tile Clicked: ${index + 1}`;

    // calculates the row and column
    const rowClicked = Math.floor(index / 4);
    const colClicked = index & 4;
    const rowCorrect = Math.floor(correctTile / 4);
    const colCorrect = correctTile % 4;

    // correct choice
    if (index === correctTile) {
        clickedTile.classList.add("correct");
        resultMessage4.textContent = "Correct! You cracked the lock! Restarting...";
        setTimeout(restartChallenge4, 1000);
        return;
    }

    // almost if tile is adjacent
    const isAlmost = Math.abs(index - correctTile) === 1 || Math.abs(index - correctTile) === 4;
    if (isAlmost) {
        clickedTile.classList.add("almost");
        resultMessage4.textContent = "Close! Keep trying!";
    } else {
        // wrong choice
        clickedTile.classList.add("wrong");
        resultMessage4.textContent = "Wrong tile!";
        mistakes4++;
        mistakeCounter4.textContent = `Mistakes: ${mistakes4} / 10`;
        // checks for game over
        if (mistakes4 >= 10) {
            resultMessage4.textContent = "Too many mistakes! Restarting..."; 
            setTimeout(restartChallenge4, 1500);
            return;
        }
    }
    currentRound++;
    setTimeout(startRound4, 800);
}

// processes the mistakes 
function processMistake4(message) {
    mistakes4++; 
    mistakeCounter4.textContent = `Mistakes: ${mistakes4} / 10`;
    resultMessage4.textContent = message;

    if (mistakes4 >= 10) {
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