export class Battle {
  constructor({hero, enemy, ui, spellAnim, logs}) {
    this.hero = hero
    this.enemy = enemy
    this.turn = 'hero'
    this.isBattleOver = false
    this.ui = ui
    this.spellAnim = spellAnim
    this.logs = logs
  }
  start() {
    this.hero.idle()
    this.enemy.idle()
    this.bindUI()
  }

  bindUI() {
    this.hero.setMana(this.hero.mana, this.hero.maxMana)
    this.hero.setHP(this.hero.hp, this.hero.maxHp)
    this.enemy.setHP(this.enemy.hp, this.enemy.maxHp)
    this.enemy.setMana(this.enemy.mana, this.enemy.maxMana)

    this.ui.fightBtn.addEventListener('click', () => {
      if (this.turn !== 'hero' || this.isBattleOver) return

      this.heroAttack()
      // console.log(this.ui.getSelectedSpell().damage)
      // console.log(this.ui.getSelectedSpell().manaCost)
    })
  }

  async heroAttack() {
    const manacost = this.ui.getSelectedSpell().manaCost
    const spellName = this.ui.getSelectedSpell().name
    const index = this.ui.getSelectedSpell().index
    console.log(this.hero)
    // this.ui.fightBtn.classList.add('disable')
    // return
    this.ui.wrapper.classList.add('disable')

    this.hero.attack()
    await this.wait(500)
    this.spellAnim.idle()
    await this.wait(100)
    await this.spellTravel(this.spellAnim.container, this.enemy.container, -30)

    if (this.hero.mana < manacost) {
      console.log('nema mani')
      return
    }
    // return
    this.hero.damage = this.ui.getSelectedSpell().damage
    const damage = this.hero.damage
    // this.hero.attack()
    this.enemy.setHP(this.enemy.hp - damage, this.enemy.maxHp)
    this.hero.setMana(this.hero.mana - manacost, this.hero.maxMana)
    // this.updateManacostIco()
    this.ui.updateManaCostForIcons(this.hero.mana)
    await this.wait(800)
    this.addLog('Герой', damage, 'hero-turn-text', 'противнику')
    if (this.bossFightEnd()) return
    console.log('damage', damage)
    console.log('this.enemy.hp', this.enemy.hp)
    console.log('this.enemy.maxHp', this.enemy.maxHp)

    this.nextTurn()
  }
  updateManacostIco() {
    const spellContainers = document.querySelectorAll('.spell-container')
    // console.log('spellContainers', spellContainers)
    spellContainers.forEach(el => el.classList.remove('disable'))
    spellContainers.forEach((el, i) => {
      const index = this.ui.getSelectedSpell().index
      const manCost = this.ui.getSelectedSpell().manaCost
      if (i === index && this.hero.mana < manCost) {
        el.classList.add('disable')
      }
      // if (this.hero.mana < spell.manacost) {
      //   el.classList.add('disable')
      // } else {
      //   el.classList.remove('disable')
      // }
    })
  }
  addLog(attacker, text, textType = 'neitral', target) {
    const logLine = document.createElement('p')
    logLine.classList.add(`log-text`, textType)
    logLine.textContent = `${attacker} нанес ${text} урона ${target}`
    this.logs.appendChild(logLine)

    this.logs.scrollTop = this.logs.scrollHeight
  }
  dethLog({heroAlive = true, enemyAlive = true}) {
    if (heroAlive || enemyAlive) return
    const logLine = document.createElement('p')
    if (!heroAlive) {
      logLine.classList.add(`log-text`)
      logLine.textContent = 'Ваш герой повержен! Вы проиграли!'
      this.addLog.appendChild(logLine)
    }
    if (!enemyAlive) {
      logLine.classList.add(`log-text`)
      logLine.textContent = 'Вы одолели противника! Победа!'
      this.addLog.appendChild(logLine)
    }
  }
  getHit(target) {
    target.classList.add('get-hit')

    target.addEventListener(
      'animationend',
      () => {
        target.classList.remove('get-hit')
      },
      {once: true},
    )
  }
  async enemyAttack() {
    this.enemy.attack()
    this.wait(100)
    this.getHit(this.hero.container)
    const damage = this.calcDamage(this.enemy, this.hero)
    this.hero.setHP(this.hero.hp - damage, this.hero.maxHp)
    await this.wait(800)
    this.addLog('Враг', damage, 'enemy-turn-text', 'герою')
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
      this.hero.dead()
      this.dethLog({heroAlive: false})
      this.isBattleOver = true
      return true
    }
    if (this.enemy.hp <= 0) {
      console.log('-boss')
      this.enemy.dead()
      this.dethLog({enemyAlive: false})
      this.isBattleOver = true
      return true
    }
    return false
  }

  spellTravel = (spellContainer, toTarget, shift = 0) => {
    return new Promise(resolve => {
      const fromTargetRect = spellContainer.getBoundingClientRect()
      const toTargetRect = toTarget.getBoundingClientRect()
      let deltaX = toTargetRect.left - fromTargetRect.left - shift

      spellContainer.style.transition = 'transform 1s linear'
      spellContainer.style.transform = `translate(${deltaX}px)`

      spellContainer.addEventListener(
        'transitionend',
        async () => {
          await this.spellAnim.explode()
          await this.wait(500)
          spellContainer.style.transition = 'none'
          spellContainer.style.transform = `translate(0px)`
          this.ui.wrapper.classList.remove('disable')
          // this.ui.fightBtn.classList.remove('disable')
          resolve()
        },
        {once: true},
      )
    })
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
