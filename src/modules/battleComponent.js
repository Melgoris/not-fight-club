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
    const damage = Math.floor(Math.random() * 10 + this.hero.damage)
    const {damage: critHitChangeDamage, crit} = this.rollDamage({
      damage: damage,
    })
    console.log('damage', critHitChangeDamage)
    console.log('crit', crit)

    // const damage = this.hero.damage
    // this.hero.attack()
    this.enemy.setHP(this.enemy.hp - critHitChangeDamage, this.enemy.maxHp)
    this.hero.setMana(this.hero.mana - manacost, this.hero.maxMana)
    // this.updateManacostIco()
    this.ui.updateManaCostForIcons(this.hero.mana)
    await this.wait(800)
    this.addLog(
      'Герой',
      critHitChangeDamage,
      'hero-turn-text',
      'противнику',
      crit,
    )
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
  rollDamage({crit = 0.3, miss = 0.1, damage}) {
    const rand = Math.random()
    let data = {damage, crit: false}
    if (rand < miss) {
      data.damage = 0
    } else if (rand < crit) {
      data.damage = damage * 2
      data.crit = true
    }
    return data
  }
  addLog(attacker, text, textType = 'neitral', target, crit = false) {
    const logLine = document.createElement('p')
    logLine.classList.add(`log-text`, textType)

    if (text === 0) {
      logLine.textContent = `${attacker} нанес ${text} урона. Промах!`
    } else {
      logLine.textContent =
        `${attacker} нанес ${text} урона ${target}!` +
        (crit ? ' Критическое попадание!' : '')
    }

    this.logs.appendChild(logLine)
    this.logs.scrollTop = this.logs.scrollHeight
  }
  dethLog({heroAlive = true, enemyAlive = true}) {
    if (!heroAlive) {
      const logLine = document.createElement('p')
      logLine.classList.add(`log-text`)
      logLine.textContent = 'Ваш герой повержен! Вы проиграли!'
      this.logs.appendChild(logLine)
    }
    if (!enemyAlive) {
      const logLine = document.createElement('p')
      logLine.classList.add(`log-text`)
      logLine.textContent = 'Вы одолели противника! Победа!'
      this.logs.appendChild(logLine)
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
    const damage = Math.floor(Math.random() * 10 + this.enemy.damage)
    const {damage: critHitChangeDamage, crit} = this.rollDamage({
      damage: damage,
    })
    // const damage = this.calcDamage(this.enemy, this.hero)
    this.hero.setHP(this.hero.hp - critHitChangeDamage, this.hero.maxHp)
    await this.wait(800)
    this.addLog('Враг', critHitChangeDamage, 'enemy-turn-text', 'герою', crit)
    if (this.bossFightEnd()) return

    this.nextTurn()
  }

  // calcDamage(attacker, defender) {
  //   return Math.floor(Math.random() * 10 + 5)
  // }

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
