const p1 = {
	score: 0,
	button: document.querySelector('#p1Button'),
	gameDisplay: document.querySelector('#p1GameScore'),
	setScore: {
		1: 0,
		2: 0,
		3: 0,
	},
	setDisplay: {
		1: document.querySelector('#p1Set1Disp'),
		2: document.querySelector('#p1Set2Disp'),
		3: document.querySelector('#p1Set3Disp'),
	},
};
const p2 = {
	score: 0,
	button: document.querySelector('#p2Button'),
	gameDisplay: document.querySelector('#p2GameScore'),
	setScore: {
		1: 0,
		2: 0,
		3: 0,
	},
	setDisplay: {
		1: document.querySelector('#p2Set1Disp'),
		2: document.querySelector('#p2Set2Disp'),
		3: document.querySelector('#p2Set3Disp'),
	},
};

const pointValues = {
	0: '0',
	1: '15',
	2: '30',
	3: '40',
	4: 'AD',
};

let isGameOver = false;

let activeSet = 1;

function addPoint(player, opp, currentSet) {
	player.score += 1;
	if (player.score >= 4 && player.score - opp.score >= 2) {
		player.setScore[currentSet] += 1;
		player.score = 0;
		opp.score = 0;
		opp.gameDisplay.innerText = pointValues[opp.score];
		player.setDisplay[currentSet].innerText = player.setScore[currentSet];
	} else if (player.score === 4 && opp.score === 4) {
		player.score = 3;
		opp.score = 3;
		opp.gameDisplay.innerText = pointValues[opp.score];
	} else if (player.score === 4 && opp.score === 3) {
		opp.gameDisplay.innerText = '';
	}
	player.gameDisplay.innerText = pointValues[player.score];
}

p1.button.addEventListener('click', () => {
	addPoint(p1, p2, activeSet);
});
p2.button.addEventListener('click', () => {
	addPoint(p2, p1, activeSet);
});
