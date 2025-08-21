import {Character} from './characterComponent'

export class CombatUnit extends Character {
  constructor(options) {
    super(options)
    this.type = 'hero'
    this.resurseImg = options.resurseImg
    this._createBars()
  }

  _createBars() {
    this.resurseBar = document.createElement('div')
    this.resurseBar.className = 'resurse-bar'

    if (this.resurseImg)
      this.resurseBar.style.backgroundImage = `url(${resurseImg})`
    this.hpBar = document.createElement('div')
    this.hpBarFill = document.createElement('div')
    this.manaBarFill = document.createElement('div')
    this.manaBar = document.createElement('div')
    this.hpBar.className = 'hp-bar'
    this.hpBarFill.className = 'hp-bar-fill'
    this.manaBarFill.className = 'mana-bar-fill'
    this.manaBar.className = 'mana-bar'
    this.resurseBar.appendChild(this.hpBar)
    this.resurseBar.appendChild(this.manaBar)
    this.hpBar.appendChild(this.hpBarFill)
    this.manaBar.appendChild(this.manaBarFill)
    this.container.appendChild(this.resurseBar)
    this.element.appendChild(this.resurseBar)
  }

  setHP(current, max) {
    const percent = Math.max(0, (current / max) * 100)
    this.hpBarFill.style.width = `${percent}%`
    this.hp = current
  }

  setMana(current, max) {
    const percent = Math.max(0, (current / max) * 100)
    this.manaBarFill.style.width = `${percent}%`
    this.mana = current
  }
  restoreMana(amount) {
    this.mana = Math.min(this.mana + amount, this.maxMana)
  }
}
