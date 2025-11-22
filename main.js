import { Pokemon } from './pokemon.js';
import { createClickLimiter, attack } from './utils.js';

const $ = (id) => document.getElementById(id);

const {
    progressbarCharacter,
    healthCharacter,
    progressbarEnemy,
    healthEnemy,
    logsBox
} = {
    progressbarCharacter: $('progressbar-character'),
    healthCharacter: $('health-character'),
    progressbarEnemy: $('progressbar-enemy'),
    healthEnemy: $('health-enemy'),
    logsBox: $('logs')
};

const character = new Pokemon({
    name: 'Pikachu',
    maxHp: 100,
    progressBarEl: progressbarCharacter,
    healthTextEl: healthCharacter
});

const enemy = new Pokemon({
    name: 'Charmander',
    maxHp: 100,
    progressBarEl: progressbarEnemy,
    healthTextEl: healthEnemy
});

// КНОПКИ
const btnKick = $('btn-kick');
const btnStrong = $('btn-strong');
const kickLimit = createClickLimiter(6);
const strongLimit = createClickLimiter(6);

btnKick.addEventListener('click', () => {
    if (!kickLimit()) return;
    attack(character, enemy, 5, 15, logsBox);
});

btnStrong.addEventListener('click', () => {
    if (!strongLimit()) return;
    attack(character, enemy, 20, 40, logsBox);
});

character.updateUI();
enemy.updateUI();
