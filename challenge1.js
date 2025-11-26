/* 
-------------------------------------------------------
                   Start of Challenge 1
------------------------------------------------------- 
*/

// the password and attempts
let attempts = 0;                            // attempts start at 0
const maxAttempts = 5;                       // max of 5 attempts
const secretPasswordBase = "Cyber";          // password will always start with "Cyber"
let password = generatePassword();           // full password includes a random 3 digit number   

// function to generate a random three digit number for the end of the password
// displays the encoded number as a clue using caesar cipher
function generatePassword() { 
    const num = Math.floor(Math.random() * 900 + 100); // random 3-digit number 100-999
    document.getElementById("numberClue").textContent = caesarShift(String(num), 2); 
    return `${secretPasswordBase}${num}!`; // e.g. "Cyber123!"
}
 
// total time for the password challenge 
const totalTime = 300;          // 5 minutes
let timeLeft = totalTime;       // current coundown value
let timerInterval;              // reference to setInterval for the countdown

// elements for showing the timer and the progress bar 
const timerDisplay = document.getElementById("timerDisplay");
const progressBar = document.getElementById("progressBar");

// starts the countdown timer that updates every second and updates the progress bar visually
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        // formats minutes and seconds
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        // displays the time remaining
        timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds}`;
        progressBar.style.width = (timeLeft / totalTime * 100) + '%';

        // if the time expires
        if (timeLeft <= 0 ) {
            clearInterval(timerInterval);
            alert("Time's up! Password reset.");
            resetGame();
        }    
    }, 1000);
}

// resets the game, regenerates a new password, resets the attempts, resets the timer, and hides the hints and clues
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

// reset button to manually reset the game
document.getElementById("resetButton").addEventListener("click", resetGame);

// handles the guess submission by comparing the users input to the password, tracks the number of attempts, and shows the hints
document.getElementById("guessButton").addEventListener("click", () => {
    const userGuess = document.getElementById("guessInput").value.trim();
    const result = document.getElementById("result");
    attempts++;

    if (userGuess == password) {
        // if the player guessed correctly
        result.textContent = "Congrats! You guess the password!";
        clearInterval(timerInterval);
    } else {
        // wrong guess gives feedback 
        result.textContent = `Incorrect! Attempt ${attempts} of ${maxAttempts}`;
        // shows the first hint after the first password attempt
        if (attempts === 1) {
            document.getElementById("hintButton").style.display = "inline";
        }
        // shows the number clue after 3 attempts
        if (attempts === 3) {
            document.getElementById("hiddenClueHover").style.display = "inline";
            
            // reveals hover number clue
            const num = password.match(/\d+/)[0]; // extracts the 3 digits
            document.getElementById("numberClue").style.display = "inline";
            document.getElementById("numberReveal").textContent = num; 
        }

        // if the maximum attempts are reached it will reset the game
        if (attempts >= maxAttempts) {
            alert("Max attempts reached! Password reset.")
            resetGame();
        }
    }
});

// shows the extra hint 
document.getElementById("hintButton").addEventListener("click", () => {
    document.getElementById("hintText").style.display = "block";
});

// hover clue for numbers
document.getElementById("hiddenClueHover").addEventListener("mouseenter", () => {
    document.getElementById("hoverClueText").style.display = "block";
});


// caesar cipher function for encoding/decoding
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
    
    // decodes by reversing the shift
    const decoded = caesarShift(text, 26 - shift);
    document.getElementById("decoderOutput").textContent = decoded;
});

// starts timer when the page loads
startTimer();
