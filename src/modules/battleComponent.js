import {PlayerStorage} from './storage'
import {playSound} from './helperFunc'
export class Battle {
  constructor({
    hero,
    enemy,
    ui,
    spellAnim,
    logs,
    btnHome,
    bossId,
    buffDebuffs,
    locationName,
    debuffsAnimations,
    buffsAnimations,
  }) {
    this.hero = hero
    this.enemy = enemy
    this.turn = 'hero'
    this.isBattleOver = false
    this.ui = ui
    this.spellAnim = spellAnim
    this.buffDebuffs = buffDebuffs
    this.logs = logs
    this.btnHome = btnHome
    this.bossId = bossId
    this.locationName = locationName
    this.debuffsAnimations = debuffsAnimations
    this.buffsAnimations = buffsAnimations
  }

  async start() {
    this.hero.idle()
    this.enemy.idle()
    this.bindUI()
    this.hero.cloudData.addCloudText(this.hero.wrapperId, 'Очередной бой..')
    await this.wait(1000)
    this.enemy.cloudData.addCloudText(
      this.enemy.wrapperId,
      this.enemy.text || 'Убирайся смертный!',
    )
  }

  bindUI() {
    this.hero.setMana(this.hero.mana, this.hero.maxMana)
    this.hero.setHP(this.hero.hp, this.hero.maxHp)
    this.enemy.setHP(this.enemy.hp, this.enemy.maxHp)
    this.enemy.setMana(this.enemy.mana, this.enemy.maxMana)
    this.btnHome.addEventListener('click', async () => {
      // this.hero.attack()

      PlayerStorage.addLoss()
      PlayerStorage.clearCombatStore()
      window.location.hash = '#home'
    })
    this.ui.fightBtn.addEventListener('click', () => {
      if (this.turn !== 'hero' || this.isBattleOver) return
      this.heroAttack()
    })

    this.hero.container.addEventListener('dblclick', () => {
      this.hero.cloudData.addCloudText(
        this.hero.wrapperId,
        'На нос себе покликай..',
      )
    })
    this.enemy.container.addEventListener('click', async () => {
      // console.log(this.enemy.text)
      // this.buffsAnimations.heal()
      // this.debuffsAnimations.start()
      // await this.wait(200)
      // this.debuffsAnimations.loop()
      // await this.wait(2000)
      // this.debuffsAnimations.end()
      // this.buffDebuffs.heal.heal()
      // this.buffDebuffs.heal()
      this.enemy.cloudData.addCloudText(this.enemy.wrapperId, 'Опа привет')
    })
  }

  async heroAttack() {
    const manacost = this.ui.getSelectedSpell().manaCost
    const spellName = this.ui.getSelectedSpell().name
    const index = this.ui.getSelectedSpell().index
    // console.log(this.hero)
    // console.log(this.hero.damage)
    // console.log(spellName)
    // this.ui.fightBtn.classList.add('disable')
    // return
    if (this.hero.mana < manacost) {
      this.hero.cloudData.addCloudText(this.hero.wrapperId, 'Нету маны!')
      return
    }
    this.ui.wrapper.classList.add('disable')
    if (spellName === 'Heal') {
      this.hero.setHP(this.hero.hp + 50, this.hero.maxHp)
      this.buffsAnimations.heal()
      playSound('heal')
      await this.wait(2000)
    } else if (spellName === 'Curse') {
      // this.debuffsAnimations.start()
      // await this.wait(200)
      this.debuffsAnimations.loop()
      playSound('curse')
      await this.wait(2000)
      this.debuffsAnimations.end()
      this.enemy.damage = this.enemy.damage * 0.8
      await this.wait(100)
    } else {
      this.hero.attack()
      await this.wait(500)
      playSound('hero')
      this.spellAnim.idle()
      await this.wait(200)
      await this.spellTravel(
        this.spellAnim.container,
        this.enemy.container,
        -40,
      )
    }

    // return
    this.hero.damage = this.ui.getSelectedSpell().damage
    const damage = Math.floor(Math.random() * 10 + this.hero.damage)
    const {damage: critHitChangeDamage, crit} = this.rollDamage({
      damage: damage,
    })
    // console.log('damage', critHitChangeDamage)
    // console.log('crit', crit)

    // const damage = this.hero.damage
    // this.hero.attack()

    this.enemy.setHP(this.enemy.hp - critHitChangeDamage, this.enemy.maxHp)
    this.hero.setMana(this.hero.mana - manacost, this.hero.maxMana)
    this.hero.restoreMana(7)
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
    // console.log('damage', damage)
    // console.log('this.enemy.hp', this.enemy.hp)
    // console.log('this.enemy.maxHp', this.enemy.maxHp)

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
      this.enemy.cloudData.addCloudText(this.enemy.wrapperId, 'Ха! Не попал!')
    } else if (rand < crit) {
      data.damage = damage * 2
      data.crit = true
      this.enemy.cloudData.addCloudText(this.enemy.wrapperId, 'Ойой')
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
  async dethLog({heroAlive = true, enemyAlive = true}) {
    if (!heroAlive) {
      const logLine = document.createElement('p')
      logLine.classList.add(`log-text`)
      logLine.textContent = 'Ваш герой повержен! Вы проиграли!'
      this.logs.appendChild(logLine)
      PlayerStorage.addLoss()
      PlayerStorage.clearCombatStore()
      await this.wait(2000)
      window.location.hash = '#home'
    }
    if (!enemyAlive) {
      const logLine = document.createElement('p')
      logLine.classList.add(`log-text`)
      logLine.textContent = 'Вы одолели противника! Победа!'
      this.logs.appendChild(logLine)
      PlayerStorage.addWin()
      PlayerStorage.clearCombatStore()
      await this.wait(2000)
      window.location.hash = '#home'
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
    playSound('enemy')
    this.getHit(this.hero.container)
    this.ui.updateManaCostForIcons(this.hero.mana)
    const damage = Math.floor(Math.random() * 10 + this.enemy.damage)
    const {damage: critHitChangeDamage, crit} = this.rollDamage({
      damage: damage,
    })
    // const damage = this.calcDamage(this.enemy, this.hero)
    this.hero.setHP(this.hero.hp - critHitChangeDamage, this.hero.maxHp)

    await this.wait(800)
    this.addLog('Враг', critHitChangeDamage, 'enemy-turn-text', 'герою', crit)
    this.ui.wrapper.classList.remove('disable')
    if (this.bossFightEnd()) return
    this.saveProgress()
    this.nextTurn()
  }
  saveProgress() {
    PlayerStorage.updateCombatData({
      heroHp: this.hero.hp,
      heroMaxHp: this.hero.maxHp,
      heroMana: this.hero.mana,
      heroMaxMana: this.hero.maxMana,
      bossHp: this.enemy.hp,
      bossMaxHp: this.enemy.maxHp,
      boss: this.bossId,
      locationName: this.locationName,
      location: this.locationName[0].toUpperCase() + this.locationName.slice(1),
    })
  }
  deleteProgress() {
    PlayerStorage.updateCombatData({
      locationName: null,
      location: null,
    })
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
      // console.log('-hero')
      // this.hero.dead()

      this.hero.skin.dead ? this.hero.die() : this.hero.dead()
      this.dethLog({heroAlive: false})
      this.afterFightModal('defeat')
      this.wait(1200)
      this.isBattleOver = true
      return true
    }
    if (this.enemy.hp <= 0) {
      // console.log('-boss')
      this.enemy.skin.dead ? this.enemy.die() : this.enemy.dead()
      // this.enemy.dead()
      this.dethLog({enemyAlive: false})
      this.afterFightModal('victory')
      this.wait(1200)
      this.isBattleOver = true
      return true
    }
    return false
  }
  afterFightModal(result) {
    const afterModal = document.createElement('div')
    afterModal.classList.add('after-fight-modal', result)
    afterModal.textContent = result === 'victory' ? 'Победа!' : 'Поражение...'
    document.body.appendChild(afterModal)

    setTimeout(() => {
      afterModal.remove()
    }, 1000)
  }
  spellTravel = (spellContainer, toTarget, shift = 0) => {
    spellContainer.style.opacity = 1
    return new Promise(resolve => {
      const fromTargetRect = spellContainer.getBoundingClientRect()
      const toTargetRect = toTarget.getBoundingClientRect()
      let deltaX = toTargetRect.left - fromTargetRect.left - shift

      spellContainer.style.transition = 'transform 1s linear'
      spellContainer.style.transform = `translate(${deltaX}px)`

      spellContainer.addEventListener(
        'transitionend',
        async () => {
          await this.wait(200)
          await this.spellAnim.explode()
          await this.wait(500)
          spellContainer.style.transition = 'none'
          spellContainer.style.transform = `translate(0px)`
          spellContainer.style.opacity = 0
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
