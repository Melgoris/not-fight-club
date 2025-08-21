export class Battle {
  constructor({hero, enemy, ui}) {
    this.hero = hero
    this.enemy = enemy
    this.turn = 'hero'
    this.isBattleOver = false
    this.ui = ui
  }
  start() {
    console.log('gav')
    this.hero.idle()
    this.enemy.idle()
    this.bindUI()
  }

  bindUI() {
    this.ui.fightBtn.addEventListener('click', () => {
      if (this.turn !== 'hero' || this.isBattleOver) return

      this.heroAttack()
      console.log(this.ui.getSelectedSpell().damage)
      console.log(this.ui.getSelectedSpell().manaCost)
    })
  }

  async heroAttack() {
    const manacost = this.ui.getSelectedSpell().manaCost
    const spellName = this.ui.getSelectedSpell().name
    if (this.hero.mana < manacost) {
      console.log('nema mani')
      return
    }
    // return
    this.hero.damage = this.ui.getSelectedSpell().damage
    const damage = this.hero.damage
    this.hero.attack()
    this.enemy.setHP(this.enemy.hp - damage, this.enemy.maxHp)
    this.hero.setMana(this.hero.mana - manacost, this.hero.maxMana)
    await this.wait(800)
    if (this.bossFightEnd()) return
    console.log('damage', damage)
    console.log('this.enemy.hp', this.enemy.hp)
    console.log('this.enemy.maxHp', this.enemy.maxHp)
    this.nextTurn()
  }

  async enemyAttack() {
    this.enemy.attack()
    const damage = this.calcDamage(this.enemy, this.hero)
    this.hero.setHP(this.hero.hp - damage, this.hero.maxHp)

    await this.wait(800)
    if (this.bossFightEnd()) return

    this.nextTurn()
  }

  calcDamage(attacker, defender) {
    return Math.floor(Math.random() * 10 + 5)
  }

  nextTurn() {
    if (this.turn === 'hero') {
      this.turn = 'enemy'
      this.enemyAttack()
    } else {
      this.turn = 'hero'
    }
  }

  bossFightEnd() {
    if (this.hero.hp <= 0) {
      console.log('-hero')
      this.isBattleOver = true
      return true
    }
    if (this.enemy.hp <= 0) {
      console.log('-boss')
      this.isBattleOver = true
      return true
    }
    return false
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
