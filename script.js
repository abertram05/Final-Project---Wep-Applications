// set the secret password to Cyber123! 
// this is the password that the user will have to guess
const secretPassword = "Cyber123!";

// finds the button on the page
const button = document.getElementById("guessButton");

if (button) {
    button.addEventListener("click", () => {
        const userGuess = document.getElementById("guessInput").value.trim();
        const result = document.getElementById("result");

        if (userGuess === secretPassword) {
            result.textContent = "Correct! You have found the correct password! Now go try challenge 2!"
        } else {
            result.textContent = "Incorrect! Keep looking for the clues!"
        }
    });
}