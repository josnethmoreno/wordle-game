import './style.css'

import 'remixicon/fonts/remixicon.css'
import 'animate.css';

import { words, word } from '/src/words.js'

const tiles = document.querySelectorAll('.game-tile')
let positionTile = 0
const rows = document.querySelectorAll('.game-row')
let positionRow = 0
let userWord = ''
const letterRegex = /[a-z]/i

document.addEventListener('keydown', (e) => {
	if(e.key.match(letterRegex) && e.key.length === 1) {
		typeLetter(e.key.toLowerCase());
	}

	if(e.key.match(letterRegex) && e.key === 'Enter') {
		guessWord(userWord)
	}

	if(e.key.match(letterRegex) && e.key === 'Backspace') {
		deleteLetter()
	}
})

const typeLetter = (key) => {
	if (userWord.length < 5) {
		rows[positionRow].children[positionTile].setAttribute('data-letter', key)
		positionTile++
		userWord += key;
	}
}

const deleteLetter = () => {
	if(userWord.length === 0) return 

	positionTile--
	userWord = userWord.slice(0, -1)
	rows[positionRow].children[positionTile].removeAttribute('data-letter')
}

const guessWord = (userWord) => {
	if (userWord.length < 5) return console.error('No engouh letter')
	if (!words.includes(userWord)) return console.error('No word in list')

	const arrayWord = word.split('');
	arrayWord.forEach((letter, index) => {
		const dataLetter = rows[positionRow].children[index].getAttribute('data-letter');
		if (arrayWord.includes(dataLetter)) {
			if (letter === dataLetter) {
				return rows[positionRow].children[index].setAttribute('data-status', 'true')
			}
			return rows[positionRow].children[index].setAttribute('data-status', 'find')
		}
		rows[positionRow].children[index].setAttribute('data-status', 'false')
	})

	if(userWord === word) {
		return winGame()
	}

	updateRow()
}

const updateRow = () => {
	positionRow += 1
	positionTile = 0
	userWord = ''
}

const winGame = () => {
	modalStats();
}

const resetGame = () => {
	positionRow = 0
	positionTile = 0
	userWord = ''

	tiles.forEach((tile) => {
		tile.removeAttribute('data-letter')
		tile.removeAttribute('data-status')
	})
}

const modalStats = () => {
	console.log(stats)
}
