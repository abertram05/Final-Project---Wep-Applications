/* 
-------------------------------------------------------
                   Start of Challenge 1
------------------------------------------------------- 
*/

// the password and attempts
let attempts = 0;                            // attempts start at 0
const maxAttempts = 5;                       // max of 5 attempts
const secretPasswordBase = "Cyber";          // password will always start with "Cyber"
let password = generatePassword();           

// function to generate a random three digit number for the end of the password
function generatePassword() { 
    const num = Math.floor(Math.random() * 900 + 100); // random 3-digit number
    document.getElementById("numberClue").textContent = caesarShift(String(num), 2); 
    return `${secretPasswordBase}${num}!`;
}
 
// the timer
const totalTime = 300; // 5 minutes
let timeLeft = totalTime;
let timerInterval;

const timerDisplay = document.getElementById("timerDisplay");
const progressBar = document.getElementById("progressBar");

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        // updates the display
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds}`;
        progressBar.style.width = (timeLeft / totalTime * 100) + '%';

        if (timeLeft <= 0 ) {
            clearInterval(timerInterval);
            alert("Time's up! Password reset.");
            resetGame();
        }    
    }, 1000);
}

// resets the game
function resetGame() {
    password = generatePassword();
    attempts = 0;
    timeLeft = totalTime;
    document.getElementById("result").textContent = "";
    document.getElementById("hintButton").style.display = "none";
    document.getElementById("hintText").style.display = "none";
    document.getElementById("hiddenClueHover").style.display = "none";
    document.getElementById("hoverClueText").style.display = "none";
    clearInterval(timerInterval);
    startTimer();
}

// reset button click
document.getElementById("resetButton").addEventListener("click", resetGame);

// guess logic
document.getElementById("guessButton").addEventListener("click", () => {
    const userGuess = document.getElementById("guessInput").value.trim();
    const result = document.getElementById("result");
    attempts++;

    if (userGuess == password) {
        result.textContent = "Congrats! You guess the password!";
        clearInterval(timerInterval);
    } else {
        result.textContent = `Incorrect! Attempt ${attempts} of ${maxAttempts}`;
        if (attempts === 1) {
            document.getElementById("hintButton").style.display = "inline";
        }
        if (attempts === 3) {
            document.getElementById("hiddenClueHover").style.display = "inline";
            
            // reveals hover number clue
            const num = password.match(/\d+/)[0]; // extracts the 3 digits
            document.getElementById("numberClue").style.display = "inline";
            document.getElementById("numberReveal").textContent = num; 
        }
        if (attempts >= maxAttempts) {
            alert("Max attempts reached! Password reset.")
            resetGame();
        }
    }
});

// the hint button
document.getElementById("hintButton").addEventListener("click", () => {
    document.getElementById("hintText").style.display = "block";
});

// hover clue for numbers
document.getElementById("hiddenClueHover").addEventListener("mouseenter", () => {
    document.getElementById("hoverClueText").style.display = "block";
});


// caesar cipher function
function caesarShift(str, shift) {
    let result = "";

    for (let i = 0; i < str.length; i++) {
        let char = str[i];

        // only shifts letters (A-Z or a-z)
        if (char.match(/[a-z]/i)) {
            let code = char.charCodeAt(0);

            let base = (code >=97) ? 97 : 65;
            char = String.fromCharCode(((code - base + shift) % 26) + base);
        }
        result += char;
    }
    return result;
}

// shows cipher clue
document.getElementById("cipherText").textContent = 
    caesarShift(secretPasswordBase, 3);

// decoder tool
document.getElementById("decodeButton").addEventListener("click", () => {
    const text = document.getElementById("decoderInput").value;
    const shift = parseInt(document.getElementById("decoderShift").value);

    const decoded = caesarShift(text, 26 - shift);
    document.getElementById("decoderOutput").textContent = decoded;
});

// starts timer when the page loads
startTimer();
