//  ФУНКЦІЇ РОБОТИ З DOM + ДЕСТРУКТУРИЗАЦІЯ

const $ = (id) => document.getElementById(id);

const {
    progressbarCharacter,
    healthCharacter,
    progressbarEnemy,
    healthEnemy,
    logs: logsBox
} = {
    progressbarCharacter: $("progressbar-character"),
    healthCharacter: $("health-character"),
    progressbarEnemy: $("progressbar-enemy"),
    healthEnemy: $("health-enemy"),
    logs: $("logs")
};

//  ОБ’ЄКТИ ПЕРСОНАЖІВ

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

//  ЛОГИ БОЮ

function addLog(attacker, defender, damage, leftHP) {
    const msg = logs[Math.floor(Math.random() * logs.length)]
        .replace("[ПЕРСОНАЖ №1]", attacker.name)
        .replace("[ПЕРСОНАЖ №2]", defender.name);

    const row = document.createElement("div");
    row.textContent = `${msg} → Урон: ${damage} | Залишилось: ${leftHP} HP`;

    logsBox.prepend(row);
}

//  ФУНКЦІЯ АТАКИ

function attack(attacker, defender, min, max) {
    const damage = Math.floor(Math.random() * (max - min + 1)) + min;
    defender.takeDamage(damage);
    addLog(attacker, defender, damage, defender.hp);
}

//  ЗАМИКАННЯ ДЛЯ ПІДРАХУНКУ КЛІКІВ З ЛІМІТОМ

const createClickLimiter = (limit) => {
    let count = 0;

    return () => {
        if (count >= limit) {
            console.log(`Ліміт досягнуто! (${limit})`);
            return false;
        }

        count++;
        console.log(`Натискань: ${count} | Залишилось: ${limit - count}`);
        return true;
    };
};

//  КНОПКИ ТА ВІШАННЯ ЛІМІТІВ

const btnKick = $("btn-kick");
const btnStrong = $("btn-strong");

const kickLimit = createClickLimiter(6);
const strongLimit = createClickLimiter(6);

btnKick.onclick = () => {
    if (!kickLimit()) return;
    attack(character, enemy, 5, 15);
};

btnStrong.onclick = () => {
    if (!strongLimit()) return;
    attack(character, enemy, 20, 40);
};

//  СТАРТОВА ІНІЦІАЛІЗАЦІЯ

character.updateUI();
enemy.updateUI();
