import { logs } from './logs.js';

export function addLog(attacker, defender, damage, leftHP, logsBox) {
    const msg = logs[Math.floor(Math.random() * logs.length)]
        .replace('[ПЕРСОНАЖ №1]', attacker.name)
        .replace('[ПЕРСОНАЖ №2]', defender.name);

    const row = document.createElement('div');
    row.textContent = `${msg} → Урон: ${damage} | Залишилось: ${leftHP} HP`;

    logsBox.prepend(row);
}

export function attack(attacker, defender, min, max, logsBox) {
    const damage = Math.floor(Math.random() * (max - min + 1)) + min;
    defender.takeDamage(damage);
    addLog(attacker, defender, damage, defender.hp, logsBox);
}

export function createClickLimiter(limit) {
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
}