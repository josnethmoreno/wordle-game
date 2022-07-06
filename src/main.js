import './style.css'
import 'remixicon/fonts/remixicon.css'

const tiles = document.querySelectorAll('.game-tile');
const rows = document.querySelectorAll('.game-row');

const letterRegex = /[a-z]/i;
let tilePosition = 0;

document.addEventListener('keydown', (e) => {
	if(e.key.match(letterRegex) && e.key.length === 1) {
		console.log(tiles[tilePosition])
	}
})