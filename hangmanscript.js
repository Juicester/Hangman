//console.log('hello');

let word = 'hello';

const wordArea = document.querySelector('.word-area');

let splitWord = word.split('');
console.log(splitWord);
wordArea.style.gridTemplateColumns = `repeat(${splitWord.length}, 8vmin)`;

for (let i = 0; i < splitWord.length; i++) {
	let div = document.createElement('div');
	div.classList.add('letter-square');
	// div.setAttribute('data-id', i);
	div.innerText = splitWord[i];
	wordArea.appendChild(div);
}

const guessButton = document.querySelector('.letter-guess-button');
// const guessArea = document.querySelector('.letter-guess');

guessButton.addEventListener('click', letterGuess);
let missedGuessArray = [];
let correctGuessArray = [];
let missedTurnCounter = 0;

function letterGuess(event) {
	const userGuess = document.querySelector('.user-letter-guess').value;
	console.log(userGuess);

	const letterBoxes = document.querySelectorAll('.letter-square');
	for (let i = 0; i < splitWord.length; i++) {
		if (userGuess.toUpperCase() == splitWord[i].toUpperCase()) {
			letterBoxes[i].style.color = 'black';
			correctGuessArray.push(userGuess);
			// console.log('its the same');
		} else {
			// if (missedGuessArray.length === 0) {
			// 	missedGuessArray.push(userGuess);
			// } else if (missedGuessArray[length - 1] !== userGuess) {
			// 	missedGuessArray.push(userGuess);
			// }
		}
	}
	checkWinner();
	missedTurnCounter++;
}

function checkWinner() {
	// console.log('Missed Guess Array: ', missedGuessArray);
	console.log('Correct Guess Array: ', correctGuessArray);
	console.log(missedTurnCounter);

	if (correctGuessArray.length === splitWord.length) {
		console.log('You Win');
	} else if (missedTurnCounter > 6) {
		console.log('You Lose :( ');
	}
}
