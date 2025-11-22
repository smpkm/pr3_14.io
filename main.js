import { Game } from './game.js';

const $ = (id) => document.getElementById(id);

const logsBox = $('logs');
const controlEl = document.querySelector('.control');

const playerDom = {
    progress: $('progressbar-character'),
    health: $('health-character'),
    name: $('name-character'),
    img: document.getElementById('img-character'),
};

const enemyDom = {
    progress: $('progressbar-enemy'),
    health: $('health-enemy'),
    name: $('name-enemy'),
    img: document.getElementById('img-enemy'),
};

const game = new Game({
    logsBox,
    controlEl,
    playerDom,
    enemyDom,
});

game.startGame();