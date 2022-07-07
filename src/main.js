import './style.css'
import 'remixicon/fonts/remixicon.css'

const tiles = document.querySelectorAll('.game-tile');
let tilePosition = 0;
const rows = document.querySelectorAll('.game-row');
let rowPosition = 0;
const word = 'Julia'
const letterRegex = /[a-z]/i;

document.addEventListener('keydown', (e) => {
	if(e.key.match(letterRegex) && e.key.length === 1) {
		updateLetter(e.key)
	}
})

let wordUser = '';

const updateLetter = (letter) => {
	tiles[tilePosition].setAttribute('data-letter', letter)
	tilePosition++
	wordUser += letter

	if(tilePosition === 5 || tilePosition === 10 || tilePosition === 15 || tilePosition === 20 || tilePosition === 25 || tilePosition === 30 ) {
		guessWord(wordUser)
		rowPosition++
	}

	if(tilePosition === 30) {
		endGame()
	}
}

const guessWord = (word) => {
	rows[rowPosition].setAttribute('data-word', wordUser)
	wordUser = ''
}

const endGame = () => {
	tilePosition = 0
	rowPosition = 0
	tiles.forEach((tile) => {
		tile.setAttribute('data-letter', '')
	})
	rows.forEach((row) => {
		row.setAttribute('data-word', '')
	})
}


