//console.log('hello');

let word = 'sbitches';

const wordArea = document.querySelector('.word-area');

let splitWord = word.split('');
console.log(splitWord);
wordArea.style.gridTemplateColumns = `repeat(${splitWord.length}, 8vmin)`;

for (let i = 0; i < splitWord.length; i++) {
	let div = document.createElement('div');
	div.classList.add('letter-square');
	div.setAttribute('data-id', i);
	div.innerText = splitWord[i];
	wordArea.appendChild(div);
}

const guessButton = document.querySelector('.letter-guess-button');
// const guessArea = document.querySelector('.letter-guess');

guessButton.addEventListener('click', letterGuess);

function letterGuess(event) {
	const userGuess = document.querySelector('.user-letter-guess').value;
	console.log(userGuess);

	const letterBoxes = document.querySelectorAll('.letter-square');
	for (let i = 0; i < splitWord.length; i++) {
		if (userGuess.toUpperCase() == splitWord[i].toUpperCase()) {
			letterBoxes[i].style.color = 'black';
			// console.log('its the same');
		} else {
			// console.log('not the same');
		}
	}
	//userGuess = '';
}
