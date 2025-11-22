import { pokemons } from './pokemons.js';
import { Pokemon } from './pokemon.js';
import { attack as doAttack, createClickLimiter } from './utils.js';

export class Game {
    constructor({ logsBox, controlEl, playerDom, enemyDom }) {
        this.logsBox = logsBox;
        this.controlEl = controlEl;
        this.playerDom = playerDom;
        this.enemyDom = enemyDom;

        this.player = null;
        this.enemy = null;
        this.isGameOver = false;
        this.enemyAttackState = null;
    }

    getRandomPokemon(exceptName = null) {
        let pool = pokemons;
        if (exceptName) {
            pool = pokemons.filter(poke => poke.name !== exceptName);
        }
        const index = Math.floor(Math.random() * pool.length);
        return pool[index];
    }

    startGame() {
        this.isGameOver = false;
        this.enemyAttackState = null;

        const playerData = this.getRandomPokemon();
        const enemyData = this.getRandomPokemon(playerData.name);

        this.player = new Pokemon({
            ...playerData,
            progressBarEl: this.playerDom.progress,
            healthTextEl: this.playerDom.health,
            nameEl: this.playerDom.name,
            imgEl: this.playerDom.img
        });

        this.enemy = new Pokemon({
            ...enemyData,
            progressBarEl: this.enemyDom.progress,
            healthTextEl: this.enemyDom.health,
            nameEl: this.enemyDom.name,
            imgEl: this.enemyDom.img
        });

        this.renderControls();
    }

    clearControls() {
        this.controlEl.innerHTML = '';
    }

    renderControls() {
        this.clearControls();
        this.playerAttackStates = [];

        this.player.attacks.forEach((attackData) => {
            const btn = document.createElement('button');
            btn.classList.add('button');

            let left = attackData.maxCount;
            const limiter = createClickLimiter(left);

            const updateBtnText = () => {
                btn.textContent = `${attackData.name} (${left})`;
            };

            updateBtnText();

            btn.addEventListener('click', () => {
                if (this.isGameOver) return;
                if (!limiter()) return;

                left--;
                updateBtnText();

                if (left <= 0) {
                    btn.disabled = true;
                }

                this.playerAttack(attackData);
            });

            this.controlEl.appendChild(btn);

            this.playerAttackStates.push({
                attackData,
                left,
                limiter,
                btn
            });
        });
    }

    playerAttack(attackData) {
        doAttack(
            this.player,
            this.enemy,
            attackData.minDamage,
            attackData.maxDamage,
            this.logsBox
        );

        if (this.enemy.hp <= 0) {
            this.handleEnemyDefeated();
            return;
        }

        this.enemyTurn();
    }

    enemyTurn() {
        const attackData = this.enemy.attacks[0];
        if (!attackData) return;

        if (!this.enemyAttackState) {
            this.enemyAttackState = {
                left: attackData.maxCount
            };
        }

        if (this.enemyAttackState.left <= 0) {
            return;
        }

        this.enemyAttackState.left--;

        doAttack(
            this.enemy,
            this.player,
            attackData.minDamage,
            attackData.maxDamage,
            this.logsBox
        );

        if (this.player.hp <= 0) {
            this.handlePlayerDefeated();
        }
    }

    handleEnemyDefeated() {
        const msg = document.createElement('div');
        msg.textContent = `${this.enemy.name} повержен! Появляется новый противник...`;
        this.logsBox.prepend(msg);

        const newEnemyData = this.getRandomPokemon(this.enemy.name);

        this.enemy = new Pokemon({
            ...newEnemyData,
            progressBarEl: this.enemyDom.progress,
            healthTextEl: this.enemyDom.health,
            nameEl: this.enemyDom.name,
            imgEl: this.enemyDom.img
        });

        this.enemyAttackState = null;
    }

    handlePlayerDefeated() {
        this.isGameOver = true;

        const msg = document.createElement('div');
        msg.textContent = `${this.player.name} проиграл! Обновите страницу, чтобы начать заново.`;
        this.logsBox.prepend(msg);
    }
}