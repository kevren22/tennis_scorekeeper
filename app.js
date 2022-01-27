const p1 = {
	score: 0,
	button: document.querySelector('#p1Button'),
	display: document.querySelector('#p1Display'),
	gameScore: document.querySelector('#p1GameScore'),
};
const p2 = {
	score: 0,
	button: document.querySelector('#p2Button'),
	display: document.querySelector('#p2Display'),
	gameScore: document.querySelector('#p2GameScore'),
};

const pointValues = {
	0: '0',
	1: '15',
	2: '30',
	3: '40',
	4: 'AD',
};

function addPoint(player) {
	player.score += 1;
	player.gameScore.innerText = pointValues[player.score];
}

p1.button.addEventListener('click', () => {
	addPoint(p1);
});
p2.button.addEventListener('click', () => {
	addPoint(p2);
});
