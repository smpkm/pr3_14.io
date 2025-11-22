export class Pokemon {
    constructor({
        name,
        hp,
        type,
        img,
        attacks = [],
        progressBarEl,
        healthTextEl,
        nameEl,
        imgEl
    }) {
        this.name = name;
        this.type = type;
        this.maxHp = hp;
        this.hp = hp;
        this.img = img;
        this.attacks = attacks;

        this.progressBarEl = progressBarEl;
        this.healthTextEl = healthTextEl;
        this.nameEl = nameEl;
        this.imgEl = imgEl;

        this.renderInitial();
    }

    renderInitial() {
        if (this.nameEl) {
            this.nameEl.textContent = this.name;
        }
        if (this.imgEl && this.img) {
            this.imgEl.src = this.img;
        }
        this.updateUI();
    }

    updateUI() {
        const hpPercent = (this.hp / this.maxHp) * 100;

        if (this.progressBarEl) {
            this.progressBarEl.style.width = `${hpPercent}%`;
            this.progressBarEl.classList.remove('low', 'critical');

            if (hpPercent <= 20) {
                this.progressBarEl.classList.add('critical');
            } else if (hpPercent <= 60) {
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