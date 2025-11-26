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



/* 
-------------------------------------------------------
                   Start of Challenge 2
------------------------------------------------------- 
*/

// 10 emails that are either true or false for a phishing email
const emailRounds = [
    {
        text: "Your Microsoft account has unusual sign-in activity. Please verify your password immediately: http://security-verify-login.com",
        phish: true
    },
    {
        text: "Your package from Amazon is arriving tomorrow. Track your order inside your Amazon account.",
        phish: false
    },
    {
        text: "IT Admin: Your mailbox is full. Click here to upgrade your storage: http://it-support-mailbox-reset.net",
        phish: true
    },
    {
        text: "Reminder: Your student financial aid form is due next week. Submit it through the official university portal.",
        phish: false
    },
    {
        text: "Netflix: Payment failed. Update your card at http://netflix-billing-page.helpcenter.cc",
        phish: true
    },
    {
        text: "PayPal: A new device was added to your account. Review it in your PayPal settings.",
        phish: false
    },
    {
        text: "Apple ID Locked! Your account will be permanently disabled unless you confirm your identity now.",
        phish: true
    },
    {
        text: "Wells Fargo: Fraud detected. Call our 24h hotline or log in through YOUR banking app.",
        phish: false
    },
    {
        text: "Congratulations! You won a free CyberSecure antivirus license. Download your activation tool here.",
        phish: true
    },
];

// challenge state
let roundIndex = 0;
let timer2 = null;
let timeLeft2 = 60;

// html elements
const emailBox = document.getElementById("emailBox");
const emailCounter = document.getElementById("emailCounter");
const timerDisplay2 = document.getElementById("timerDisplay2");
const resultMessage = document.getElementById("resultMessage");
const phishBtn = document.getElementById("phishBtn");
const legitBtn = document.getElementById("legitBtn");

// function that starts a round
function startEmailRound() {
    if (roundIndex >= emailRounds.length) {
        resultMessage.textContent = "You passed all 10 Emails! Congratulations";
        clearInterval(timer2);
        return;
    }

    // shows which email number we are on
    emailCounter.textContent = `Email ${roundIndex + 1} of 10`;

    // load email text
    emailBox.textContent = emailRounds[roundIndex.text];

    // resets the timer
    timeLeft2 = 60;
    updateTimer2();
    clearInterval(timer2);
    timer2 = setInterval(runTimer2, 1000);
}

// function for the timer
function runTimer2() {
    timeLeft2--;
    updateTimer2();

    if (timeLeft2 <= 0) {
        clearInterval(timer2);
        restartChallenge2("Your time ran out. Restarting Challenge...");
    }
}

// update the display
function updateTimer2() {
    timerDisplay2.textContent = `Time Remaining: ${timeLeft2}s`;
}

// function for the players answer
function chooseAnswer(isPhishGuess) {
    const correct = emailRounds[roundIndex].phish;

    if (isPhishGuess === correct) {
        // correct goes to the next email
        roundIndex++;
        startEmailRound();
    } else {
        // wrong restarts the challenge
        restartChallenge2("Incorrect! Restarting from email 1...");
    }
}

phishBtn.addEventListener("click", () => chooseAnswer(true));
legitBtn.addEventListener("click", () => chooseAnswer(false));

// restarts the challenge
function restartChallenge2(message) {
    resultMessage.textContent = message;
    roundIndex = 0;
    clearInterval(timer2);
    setTimeout(() => {
        resultMessage.textContent = "";
        startEmailRound();
    }, 1500);
}

// auto starts challenge 2 when page opens
if (emailBox) {
    startEmailRound();
}