export class Character {
  constructor({
    skin,
    frameWidth,
    frameHeight,
    container,
    hp = 100,
    maxHp = 100,
    mana = 0,
    maxMana = 100,
    damage,
    wtapperClassName,
    wrapperId,
    renderSection,
    abilities,
    manaRegen,
  }) {
    this.skin = skin
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.renderSection = renderSection
    this.currentFrame = 0
    this.intervalId = null
    this.hp = hp
    this.damage = damage
    this.maxHp = maxHp
    this.mana = mana
    this.maxMana = maxMana
    this.spellName = null
    this.wtapperClassName = wtapperClassName
    this.wrapperId = wrapperId
    this.abilities = abilities
    this.manaRegen = manaRegen
    this.container = container || this._createContainer()
    // if (renderSection)
    //   this.renderSection = document.querySelector(`#${renderSection}`)

    this._createElement()
  }
  _createContainer() {
    const wrapper = document.createElement('div')
    if (this.wtapperClassName) wrapper.className = this.wtapperClassName
    if (this.wrapperId) wrapper.id = this.wrapperId
    if (this.renderSection) this.renderSection.appendChild(wrapper)
    return wrapper
  }
  _createElement() {
    this.element = document.createElement('div')
    this.element.style.width = `${this.frameWidth}px`
    this.element.style.height = `${this.frameHeight}px`
    this.element.style.backgroundRepeat = 'no-repeat'
    this.element.style.imageRendering = 'pixelated'
    this.container.appendChild(this.element)
  }

  _animate({
    sprite,
    totalFrames,
    fps,
    loop = false,
    endFrame = null,
    onFinish,
    delayAfter = 0,
    returnToIdle = false,
    stop = false,
  }) {
    clearInterval(this.intervalId)
    if (stop) return
    this.currentFrame = 0
    const frameTime = 1000 / fps

    this.element.style.backgroundImage = `url(${sprite})`

    this.intervalId = setInterval(() => {
      this.element.style.backgroundPositionX = `-${
        this.currentFrame * this.frameWidth
      }px`
      this.currentFrame++

      if (this.currentFrame >= totalFrames) {
        if (loop) {
          this.currentFrame = 0
        } else {
          clearInterval(this.intervalId)

          if (endFrame !== null) {
            this.element.style.backgroundPositionX = `-${
              endFrame * this.frameWidth
            }px`
          }

          setTimeout(() => {
            onFinish?.()
            if (returnToIdle) {
              this.idle()
            }
          }, delayAfter)
        }
      }
    }, frameTime)
  }
  idle() {
    const {sprite, totalFrames, fps} = this.skin.idle
    this._animate({sprite, totalFrames, fps, loop: true})
  }
  portal() {
    this._animate({sprite: this.skin, totalFrames: 8, fps: 5, loop: true})
  }
  attack() {
    const {sprite, totalFrames, fps, endFrame} = this.skin.attack
    this._animate({
      sprite,
      totalFrames,
      fps,
      endFrame,
      loop: false,
      delayAfter: 200,
      returnToIdle: true,
    })
  }

  walk() {
    const {sprite, totalFrames, fps} = this.skin.walk
    this._animate({sprite, totalFrames, fps, loop: true})
  }

  protect() {
    const {sprite, totalFrames, fps} = this.skin.protect
    this._animate({
      sprite,
      totalFrames,
      fps,
      loop: false,
      delayAfter: 500,
      returnToIdle: true,
    })
  }

  changeSkin(newSkinSet) {
    this.skin = newSkinSet
  }
}
