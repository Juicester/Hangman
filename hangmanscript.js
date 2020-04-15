// Target all of the HTML Elements I will need
const wordArea = document.querySelector('.word-area');
const wordSubmitButton = document.querySelector('.word-submit-button');
const resetButton = document.querySelector('.reset-button');
const guessButton = document.querySelector('.letter-guess-button');
const missedGuesses = document.querySelector('.missed-guesses');
const hangmanImage = document.querySelector('.hangman-image');
let wordInput = document.querySelector('.user-word-input');

// Add event listeners to buttons
guessButton.addEventListener('click', letterGuess);
wordSubmitButton.addEventListener('click', wordSubmit);
resetButton.addEventListener('click', resetGameBoard);

// Set Global Variables
let splitWordInput;
let missedGuessArray = [];
let correctGuessArray = [];
let missedTurnCounter = 0;

// Print Hello in the hangman format as the opening
let word = 'HELLO';
word = word.toLowerCase();
let splitWord = word.split('');
wordArea.style.gridTemplateColumns = `repeat(${splitWord.length}, 8vmin)`;
makeBoxes(splitWord, wordArea, 'hello-square');

// makes the box elements and adds a class to them
// then add it to elementToPlace
function makeBoxes(arr, elementToPlace, className) {
	for (let i = 0; i < arr.length; i++) {
		let div = document.createElement('div');
		div.classList.add(`${className}`);
		div.innerText = arr[i];
		elementToPlace.appendChild(div);
	}
}

// Action that happens when you submit a word
function wordSubmit(event) {
	// comparing when both are lower case is easier
	wordInputNew = wordInput.value.toLowerCase();
	// reset the value inside of the input so it wont give it away
	wordInput.value = '';
	// hide word input and show reset button
	event.target.style.display = 'none';
	wordInput.style.display = 'none';
	resetButton.style.display = 'inline';

	splitWordInput = wordInputNew.split('');
	// Alert if word is too short
	if (splitWordInput.length <= 1) {
		alert('A one Letter word is too easy. Try Again!');
	} else {
		// remove old div's inside word area
		let wordAreaChild = wordArea.firstElementChild;
		while (wordAreaChild) {
			wordArea.removeChild(wordAreaChild);
			wordAreaChild = wordArea.firstElementChild;
		}
		// set grid and make boxes
		wordArea.style.gridTemplateColumns = `repeat(${splitWordInput.length}, 8vmin)`;
		makeBoxes(splitWordInput, wordArea, 'letter-square');
	}
}

// Action that happens when you guess a letter
function letterGuess(event) {
	const letterBoxes = document.querySelectorAll('.letter-square');
	// get the input
	const userGuess = document
		.querySelector('.user-letter-guess')
		.value.toLowerCase();

	// check if it has been guessed before or is a letter
	let isInMissed = missedGuessArray.indexOf(userGuess);
	let isInCorrect = correctGuessArray.indexOf(userGuess);
	let letter = isLetter(userGuess);

	// Various checks for valid input
	if (userGuess.length > 1) {
		alert("You can't guess more than 1 Letter! Try Again!");
	} else if (isInMissed != -1 || isInCorrect != -1) {
		alert('You already guessed that. Try Again!');
	} else if (letter == false) {
		alert('That is not a letter! Try again!');
		// meat of the function
	} else {
		// check if the guess is in the target word
		let index = splitWordInput.indexOf(userGuess);
		// if it isn't in the target word add it to missed guesses
		if (index == -1) {
			let missedDiv = document.createElement('div');
			missedDiv.classList.add('missed-letter');
			missedDiv.innerText = userGuess;
			missedGuesses.appendChild(missedDiv);
			// add to missed guess array and increase the turn counter
			missedGuessArray.push(userGuess);
			missedTurnCounter++;
			// update the image
			if (missedTurnCounter > 9) {
				hangmanImage.setAttribute('src', '/images/ChalkHangman9.png');
			} else {
				hangmanImage.setAttribute(
					'src',
					`/images/ChalkHangman${missedTurnCounter}.png`
				);
			}
			// If it is in the target word, show the letter
		} else {
			for (let i = 0; i < splitWordInput.length; i++) {
				if (userGuess.toUpperCase() == splitWordInput[i].toUpperCase()) {
					letterBoxes[i].style.color = 'white';
					correctGuessArray.push(userGuess);
				}
			}
		}
		// check to see if the user won
		checkWinner();
	}
}

// alerts if you win or lose
function checkWinner() {
	if (correctGuessArray.length === splitWordInput.length) {
		alert('You Win!');
	} else if (missedTurnCounter >= 9) {
		alert('You Lose :( ');
	}
}

// Reset the game board
function resetGameBoard() {
	// delete the old word and the misses
	let child = wordArea.firstElementChild;
	while (child) {
		wordArea.removeChild(child);
		child = wordArea.firstElementChild;
	}
	let child2 = missedGuesses.firstElementChild.nextElementSibling;
	for (let i = 1; i <= missedGuessArray.length; i++) {
		missedGuesses.removeChild(child2);
		child2 = missedGuesses.firstElementChild.nextElementSibling;
	}

	// hide the reset button and show the input and word submit button
	resetButton.style.display = 'none';
	wordInput.style.display = 'inline';
	wordSubmitButton.style.display = 'inline';
	document.querySelector('.user-letter-guess').value = '';
	// reset global variables
	missedTurnCounter = 0;
	missedGuessArray = [];
	correctGuessArray = [];
	// reset image and make hello again
	hangmanImage.setAttribute('src', '/images/ChalkHangman0.png');
	wordArea.style.gridTemplateColumns = `repeat(${splitWord.length}, 8vmin)`;
	makeBoxes(splitWord, wordArea, 'hello-square');
}

// checks to see if the character is a letter
function isLetter(char) {
	return char.toLowerCase() != char.toUpperCase();
}
