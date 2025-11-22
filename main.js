// ===== Œ¡'™ “» œ≈–—ŒÕ¿∆≤¬ =====

const player1 = {
    name: "Pikachu",
    hp: 100,

    takeDamage(dmg) {
        this.hp = Math.max(0, this.hp - dmg);
        this.updateUI();
    },

    updateUI() {
        const bar = document.getElementById("progressbar-character");
        const text = document.getElementById("health-character");

        bar.style.width = this.hp + "%";
        text.textContent = `${this.hp} / 100`;

        this.updateColor(bar);
    },

    updateColor(bar) {
        bar.classList.remove("low", "critical");
        if (this.hp <= 30) bar.classList.add("critical");
        else if (this.hp <= 60) bar.classList.add("low");
    }
};

const player2 = {
    name: "Charmander",
    hp: 100,

    takeDamage(dmg) {
        this.hp = Math.max(0, this.hp - dmg);
        this.updateUI();
    },

    updateUI() {
        const bar = document.getElementById("progressbar-enemy");
        const text = document.getElementById("health-enemy");

        bar.style.width = this.hp + "%";
        text.textContent = `${this.hp} / 100`;

        this.updateColor(bar);
    },

    updateColor(bar) {
        bar.classList.remove("low", "critical");
        if (this.hp <= 30) bar.classList.add("critical");
        else if (this.hp <= 60) bar.classList.add("low");
    }
};


// ===== ™ƒ»Õ¿ ‘”Õ ÷≤ﬂ ¿“¿ » =====

function attack(attacker, defender, min, max) {
    const dmg = Math.floor(Math.random() * (max - min + 1)) + min;
    defender.takeDamage(dmg);

    const counter = Math.floor(Math.random() * 10) + 3;
    attacker.takeDamage(counter);
}


// ===== œ–»¬'ﬂ« ¿  ÕŒœŒ  =====

document.getElementById("btn-kick").onclick = () => {
    attack(player1, player2, 5, 15);
};

document.getElementById("btn-strong").onclick = () => {
    attack(player1, player2, 20, 40);
};

player1.updateUI();
player2.updateUI();
