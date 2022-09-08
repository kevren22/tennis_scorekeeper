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
	setsWon: 0,
	name: 'Player 1',
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
	setsWon: 0,
	name: 'Player 2',
};

const resetButton = document.querySelector('#reset');

const pointValues = {
	0: '0',
	1: '15',
	2: '30',
	3: '40',
	4: 'AD',
};

let activeSet = 1;
let isMatchOver = false;
let isTiebreak = false;

function checkSet(player, opp, currentSet) {
	if (player.setScore[currentSet] < 6) {
		return;
	} else if (
		player.setScore[currentSet] === 6 &&
		opp.setScore[currentSet] === 6
	) {
		isTiebreak = true;
	} else if (
		player.setScore[currentSet] - opp.setScore[currentSet] >= 2 ||
		player.setScore[currentSet] === 7
	) {
		player.setsWon += 1;
		activeSet += 1;
		checkMatchOver(player);
	} else {
		return;
	}
}

function checkMatchOver(player) {
	if (parseInt(player.setsWon) === 2) {
		alert(`${player.name} wins!`);
		isMatchOver = true;
	}
}

function addPoint(player, opp, activeSet) {
	if (!isMatchOver) {
		if (isTiebreak) {
			addTiebreakPoint(player, opp, activeSet);
		} else {
			addGamePoint(player, opp, activeSet);
		}
	}
}

function addGamePoint(player, opp, currentSet) {
	player.score += 1;
	if (player.score >= 4 && player.score - opp.score >= 2) {
		player.setScore[currentSet] += 1;
		player.score = 0;
		opp.score = 0;
		opp.gameDisplay.innerText = pointValues[opp.score];
		player.setDisplay[currentSet].innerText = player.setScore[currentSet];
		checkSet(player, opp, currentSet);
	} else if (player.score === 4 && opp.score === 4) {
		player.score = 3;
		opp.score = 3;
		opp.gameDisplay.innerText = pointValues[opp.score];
	} else if (player.score === 4 && opp.score === 3) {
		opp.gameDisplay.innerText = '';
	}
	player.gameDisplay.innerText = pointValues[player.score];
}

function addTiebreakPoint(player, opp, currentSet) {
	player.score += 1;
	if (player.score >= 7 && player.score - opp.score >= 2) {
		player.setScore[currentSet] += 1;
		player.score = 0;
		opp.score = 0;
		opp.gameDisplay.innerText = pointValues[opp.score];
		player.setDisplay[currentSet].innerText = player.setScore[currentSet];
		checkSet(player, opp, currentSet);
		isTiebreak = false;
	} else {
	}
	player.gameDisplay.innerText = player.score;
}

function playerReset(player) {
	player.score = 0;
	player.setsWon = 0;
	player.setScore = {
		1: 0,
		2: 0,
		3: 0,
	};
	player.gameDisplay.innerText = pointValues[player.score];
	for (let i = 1; i <= 3; i++) {
		player.setDisplay[i].innerText = player.setScore[i];
	}
}

p1.button.addEventListener('click', () => {
	addPoint(p1, p2, activeSet);
});
p2.button.addEventListener('click', () => {
	addPoint(p2, p1, activeSet);
});
resetButton.addEventListener('click', () => {
	playerReset(p1);
	playerReset(p2);
	isMatchOver = false;
	activeSet = 1;
});
