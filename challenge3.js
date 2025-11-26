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

}

// timer logic
function runTimer3() {

}

// players choice
function chooseFile() {

}

// for the mistakes

// restarts the challenge

// auto starts the challenge
startFileRound():