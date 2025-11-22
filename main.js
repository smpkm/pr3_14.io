const player1 = { name: "Pikachu", hp: 100 };
const player2 = { name: "Charmander", hp: 100 };

function updateUI() {
    const bar1 = document.getElementById("progressbar-character");
    const bar2 = document.getElementById("progressbar-enemy");
    const hp1 = document.getElementById("health-character");
    const hp2 = document.getElementById("health-enemy");

    hp1.textContent = `${player1.hp} / 100`;
    hp2.textContent = `${player2.hp} / 100`;

    bar1.style.width = player1.hp + "%";
    bar2.style.width = player2.hp + "%";

    colorBar(bar1, player1.hp);
    colorBar(bar2, player2.hp);
}

function colorBar(bar, hp) {
    bar.classList.remove("low","critical");
    if (hp > 60) return;
    if (hp > 30) bar.classList.add("low");
    else bar.classList.add("critical");
}

function attack(dmgMin, dmgMax) {
    const dmg = Math.floor(Math.random() * (dmgMax - dmgMin + 1)) + dmgMin;
    player2.hp = Math.max(0, player2.hp - dmg);

    const counter = Math.floor(Math.random() * 15);
    player1.hp = Math.max(0, player1.hp - counter);

    updateUI();
}

document.getElementById("btn-kick").onclick = () => attack(5,15);
document.getElementById("btn-strong").onclick = () => attack(20,40);

updateUI();