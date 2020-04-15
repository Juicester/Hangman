let word = 'HELLO';
word = word.toLowerCase();

const wordArea = document.querySelector('.word-area');
const wordSubmitButton = document.querySelector('.word-submit-button');
const resetButton = document.querySelector('.reset-button');
let wordInput = document.querySelector('.user-word-input');

wordSubmitButton.addEventListener('click', wordSubmit);
let splitWordInput;
resetButton.addEventListener('click', resetGameBoard);

function wordSubmit(event) {
	wordInputNew = wordInput.value.toLowerCase();
	console.log(wordInputNew);
	wordInput.value = '';
	event.target.style.display = 'none';
	wordInput.style.display = 'none';
	resetButton.style.display = 'inline';

	splitWordInput = wordInputNew.split('');

	if (splitWordInput.length <= 1) {
		alert('A one Letter word is too easy. Try Again!');
	} else {
		wordArea.style.gridTemplateColumns = `repeat(${splitWordInput.length}, 8vmin)`;
		let wordAreaChild = wordArea.firstElementChild;
		while (wordAreaChild) {
			wordArea.removeChild(wordAreaChild);
			wordAreaChild = wordArea.firstElementChild;
		}
		makeBoxes(splitWordInput, wordArea, 'letter-square');
	}
	// event.target.parentNode.style.display = 'none';
}

let splitWord = word.split('');
// console.log(splitWord);
wordArea.style.gridTemplateColumns = `repeat(${splitWord.length}, 8vmin)`;

function makeBoxes(arr, elementToPlace, className) {
	for (let i = 0; i < arr.length; i++) {
		let div = document.createElement('div');
		div.classList.add(`${className}`);
		div.innerText = arr[i];
		elementToPlace.appendChild(div);
	}
}

makeBoxes(splitWord, wordArea, 'hello-square');

const guessButton = document.querySelector('.letter-guess-button');
// const guessArea = document.querySelector('.letter-guess');

const missedGuesses = document.querySelector('.missed-guesses');
const hangmanImage = document.querySelector('.hangman-image');

guessButton.addEventListener('click', letterGuess);
let missedGuessArray = [];
let correctGuessArray = [];
let missedTurnCounter = 0;

function letterGuess(event) {
	const userGuess = document
		.querySelector('.user-letter-guess')
		.value.toLowerCase();
	console.log(userGuess);

	let isInMissed = missedGuessArray.indexOf(userGuess);
	let isInCorrect = correctGuessArray.indexOf(userGuess);
	let letter = isLetter(userGuess);
	console.log(letter);

	if (userGuess.length > 1) {
		alert("You can't guess more than 1 Letter! Try Again!");
	} else if (isInMissed != -1 || isInCorrect != -1) {
		alert('You already guessed that. Try Again!');
	} else if (letter == false) {
		alert('That is not a letter! Try again!');
	} else {
		const letterBoxes = document.querySelectorAll('.letter-square');

		let index = splitWordInput.indexOf(userGuess);

		if (index == -1) {
			let missedDiv = document.createElement('div');
			missedDiv.classList.add('missed-letter');
			missedDiv.innerText = userGuess;
			missedGuesses.appendChild(missedDiv);

			missedGuessArray.push(userGuess);
			missedTurnCounter++;
			if (missedTurnCounter > 9) {
				hangmanImage.setAttribute('src', '/images/ChalkHangman9.png');
			} else {
				hangmanImage.setAttribute(
					'src',
					`/images/ChalkHangman${missedTurnCounter}.png`
				);
			}
		} else {
			console.log('The letter exists');
			for (let i = 0; i < splitWordInput.length; i++) {
				if (userGuess.toUpperCase() == splitWordInput[i].toUpperCase()) {
					letterBoxes[i].style.color = 'white';
					correctGuessArray.push(userGuess);
				}
			}
		}
		checkWinner();
	}
}

function checkWinner() {
	console.log('Missed Guess Array: ', missedGuessArray);
	console.log('Correct Guess Array: ', correctGuessArray);
	console.log(missedTurnCounter);

	if (correctGuessArray.length === splitWordInput.length) {
		alert('You Win!');
	} else if (missedTurnCounter >= 9) {
		alert('You Lose :( ');
	}
}

function resetGameBoard() {
	let child = wordArea.firstElementChild;
	let child2 = missedGuesses.firstElementChild.nextElementSibling;
	while (child) {
		wordArea.removeChild(child);
		child = wordArea.firstElementChild;
	}
	while (child2) {
		missedGuesses.removeChild(child2);
		child2 = missedGuesses.firstElementChild;
	}

	resetButton.style.display = 'none';
	wordInput.style.display = 'inline';
	wordSubmitButton.style.display = 'inline';
	wordArea.style.gridTemplateColumns = `repeat(${splitWord.length}, 8vmin)`;
	makeBoxes(splitWord, wordArea, 'hello-square');
}

function isLetter(char) {
	return char.toLowerCase() != char.toUpperCase();
}
