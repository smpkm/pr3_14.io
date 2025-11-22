// ===== Получение элементов DOM через деструктуризацию =====
const getEl = (id) => document.getElementById(id);

const {
    progressbarCharacter,
    healthCharacter,
    progressbarEnemy,
    healthEnemy,
    logs: logsBox
} = {
    progressbarCharacter: getEl("progressbar-character"),
    healthCharacter: getEl("health-character"),
    progressbarEnemy: getEl("progressbar-enemy"),
    healthEnemy: getEl("health-enemy"),
    logs: getEl("logs")
};


// ===== ОБЪЕКТЫ ПЕРСОНАЖЕЙ =====
const character = {
    name: "Pikachu",
    hp: 100,

    updateUI() {
        const { hp } = this;
        progressbarCharacter.style.width = hp + "%";
        healthCharacter.textContent = `${hp} / 100`;
    },

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        this.updateUI();
    }
};

const enemy = {
    name: "Charmander",
    hp: 100,

    updateUI() {
        const { hp } = this;
        progressbarEnemy.style.width = hp + "%";
        healthEnemy.textContent = `${hp} / 100`;
    },

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        this.updateUI();
    }
};


// ===== ФУНКЦИЯ ЛОГА БОЯ =====
function addLog(attacker, defender, damage, leftHP) {
    // выбираем случайную фразу из массива logs (из файла logs.js)
    const msg = logs[Math.floor(Math.random() * logs.length)]
        .replace("[ПЕРСОНАЖ №1]", attacker.name)
        .replace("[ПЕРСОНАЖ №2]", defender.name);

    const row = document.createElement("div");
    row.textContent = `${msg} → Урон: ${damage} | Залишилось: ${leftHP} HP`;

    // Последнее действие — сверху
    logsBox.prepend(row);
}


// ===== ЕДИНАЯ ФУНКЦИЯ АТАКИ =====
function attack(attacker, defender, min, max) {
    const damage = Math.floor(Math.random() * (max - min + 1)) + min;

    defender.takeDamage(damage);

    addLog(attacker, defender, damage, defender.hp);
}


// ===== КНОПКИ АТАК =====
getEl("btn-kick").onclick = () => attack(character, enemy, 5, 15);
getEl("btn-strong").onclick = () => attack(character, enemy, 20, 40);


// ===== Стартовая отрисовка =====
character.updateUI();
enemy.updateUI();
