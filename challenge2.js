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
    emailBox.textContent = emailRounds[roundIndex].text;

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