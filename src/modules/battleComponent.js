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
  }
}
