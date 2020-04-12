//console.log('hello');

let word = 'HELLO';
word = word.toLowerCase();

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
	const userGuess = document
		.querySelector('.user-letter-guess')
		.value.toLowerCase();
	console.log(userGuess);

	const letterBoxes = document.querySelectorAll('.letter-square');

	let index = splitWord.indexOf(userGuess);

	if (index == -1) {
		missedGuessArray.push(userGuess);
		missedTurnCounter++;
	} else {
		console.log('The letter exists');
		for (let i = 0; i < splitWord.length; i++) {
			if (userGuess.toUpperCase() == splitWord[i].toUpperCase()) {
				letterBoxes[i].style.color = 'white';
				correctGuessArray.push(userGuess);
			}
		}
	}
	checkWinner();
}

function checkWinner() {
	console.log('Missed Guess Array: ', missedGuessArray);
	console.log('Correct Guess Array: ', correctGuessArray);
	console.log(missedTurnCounter);

	if (correctGuessArray.length === splitWord.length) {
		console.log('You Win');
	} else if (missedTurnCounter > 6) {
		console.log('You Lose :( ');
	}
}
