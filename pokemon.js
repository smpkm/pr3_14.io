export class Pokemon {
    constructor({ name, maxHp = 100, progressBarEl, healthTextEl }) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.progressBarEl = progressBarEl;
        this.healthTextEl = healthTextEl;

        this.updateUI();
    }

    updateUI() {
        const hpPercent = (this.hp / this.maxHp) * 100;

        if (this.progressBarEl) {
            this.progressBarEl.style.width = `${hpPercent}%`;

            this.progressBarEl.classList.remove('low', 'critical');
            if (hpPercent <= 20) {
                this.progressBarEl.classList.add('critical');
            } else if (hpPercent <= 40) {
                this.progressBarEl.classList.add('low');
            }
        }

        if (this.healthTextEl) {
            this.healthTextEl.textContent = `${this.hp} / ${this.maxHp}`;
        }
    }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        this.updateUI();
    }
}
