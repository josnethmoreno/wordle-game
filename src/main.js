import './style.css'

import 'remixicon/fonts/remixicon.css'
import 'animate.css';

import { words, word } from '/src/words.js'

const tiles = document.querySelectorAll('.game-tile')
const rows = document.querySelectorAll('.game-row')
const snackbar = document.querySelector('.snackbar');
const keys = document.querySelectorAll('.key');
let positionTile = 0
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

keys.forEach((key) => {
	key.addEventListener('onclick', (e) => console.log(e))
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
	if (userWord.length < 5) return showSnackbar('No engouh letter')
	if (!words.includes(userWord)) return showSnackbar('No word in list')

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

	if (positionRow === 5) return lostGame()

	updateRow()
}

const updateRow = () => {
	positionRow += 1
	positionTile = 0
	userWord = ''
}

const winGame = () => {
	setTimeout(() => {
		resetGame()
		showSnackbar('You have win', true)
	}, 1500)
}

const lostGame = () => {
	setTimeout(() => {
		showSnackbar('You have lost', false)
		resetGame()
	}, 1500)
}

const showSnackbar = (msg, status="default") => {
	snackbar.setAttribute('data-msg', msg)
	snackbar.setAttribute('data-status', status)
	snackbar.setAttribute('data-show', 'true')
	setTimeout(() => {
    snackbar.setAttribute('data-show', 'false')
  }, 4000);
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