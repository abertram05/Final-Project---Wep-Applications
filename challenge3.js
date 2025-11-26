/* 
-------------------------------------------------------
                   Start of Challenge 3
------------------------------------------------------- 
*/

// the 15 files that are either safe or have malware
const files = [
    { name: "invoice_2025_final.pdf", malware: false },
    { name: "system-update-required.exe", malware: true },
    { name: "holiday_photos.zip", malware: false },
    { name: "urgent-payment-receipt.scr", malware: true },
    { name: "notes.txt", malware: false },
    { name: "win_prize_now.exe", malware: true },
    { name: "HR_Policies_2024.docx", malware: false },
    { name: "security_patch_5.9.exe", malware: true },
    { name: "schedule.xlsx", malware: false },
    { name: "auto_run_config.bat", malware: true },
    { name: "dog_picture.png", malware: false },
    { name: "admin_passwords_backup.exe", malware: true },
    { name: "research_data.csv", malware: false },
    { name: "bank_docs_important.pdf.exe", malware: true },
    { name: "meeting_minutes.docx", malware: false },
     
]

let index3 = 0;
let mistakes = 0;
let timer3 = null;
let timeLeft3 = 10;

// html elements 
const fileBox = document.getElementById("fileBox");
const fileCounter = document.getElementById("fileCounter");
const timerDisplay3 = document.getElementById("timerDisplay3");
const mistakeCounter = document.getElementById("mistakeCounter");
const resultMessage3 = document.getElementById("resultMessage3");

const safeBtn = document.getElementById("safeBtn");
const malwareBtn = document.getElementById("malwareBtn");

// starts the round
function startFileRound() {
    if (index3 >= files.length) { 
        resultMessage3.textContent = "You scanned all 15 files! Congratulations!"
        clearInterval(timer3);
        return;
    }

    // shows the progress
    fileCounter.textContent = `File ${index3 + 1} of 15`;
    mistakeCounter.textContent = `Mistake: ${mistakes} / 3`;
    fileBox.innerHTML = `<p>${files[index3].name}</p>`;

    // resets the timer
    timeLeft3 = 10; 
    updateTimer3();
    clearInterval(timer3);
    timer3 = setInterval(runTimer3, 1000);
}

// timer logic
function runTimer3() {
    timeLeft3--;
    updateTimer3();

    if(timeLeft3 <= 0) {
        clearInterval(timer3)
        processMistake("Your time ran out! This counts as a mistake...")
    }
}

function updateTimer3() {
    timerDisplay3.textContent = `Time Remaining: ${timeLeft3}s`;
}

// players choice
function chooseFile(isMalwareGuess) {
    const correct = files[index3].malware;

    if (isMalwareGuess === correct) {
        index3++
        startFileRound();
    } else {
        processMistake("Incorrect choice!");
    }
}

// for the mistakes
function processMistake(message) {
    mistakes++;
    mistakeCounter.textContent = `Mistakes: ${mistakes} / 3`;
    resultMessage3.textContent = message;

    if (mistakes >= 3) {
        restartChallenge3("You reached 3 mistakes. Restarting Challenge...");
        return;
    }
    
    index3++;
    startFileRound();
}

// restarts the challenge
function restartChallenge3(message) {
    resultMessage3.textContent = message; 
    index3 = 0;
    mistakes = 0;
    clearInterval(timer3);

    setTimeout(() => {
        resultMessage3.textContent = "";
        startFileRound();
    }, 1500);
}

// button events 
safeBtn.addEventListener("click", () => chooseFile(false));
malwareBtn.addEventListener("click", () => chooseFile(true));

// auto starts the challenge
startFileRound();