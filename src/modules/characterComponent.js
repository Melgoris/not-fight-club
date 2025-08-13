export class Character {
  constructor({skin, frameWidth, frameHeight, fps, container}) {
    this.skin = skin
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.fps = fps
    this.container = container
    this.currentFrame = 0
    this.intervalId = null

    this._createElement()
  }

  _createElement() {
    this.element = document.createElement('div')
    this.element.style.width = `${this.frameWidth}px`
    this.element.style.height = `${this.frameHeight}px`
    this.element.style.backgroundRepeat = 'no-repeat'
    this.element.style.imageRendering = 'pixelated'
    this.container.appendChild(this.element)
  }

  _animate(sprite, totalFrames, loop = true, onFinish) {
    clearInterval(this.intervalId)
    this.currentFrame = 0
    const frameTime = 1000 / this.fps

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
          if (onFinish) onFinish()
        }
      }
    }, frameTime)
  }

  idle() {
    const {sprite, totalFrames} = this.skin.idle
    this._animate(sprite, totalFrames, true)
  }

  attack() {
    const {sprite, totalFrames} = this.skin.attack
    this._animate(sprite, totalFrames, false, () => this.idle())
  }

  walk() {
    const {sprite, totalFrames} = this.skin.walk
    this._animate(sprite, totalFrames, true)
  }

  defend() {
    const {sprite, totalFrames} = this.skin.defend
    this._animate(sprite, totalFrames, false, () => this.idle())
  }

  changeSkin(newSkinSet) {
    this.skin = newSkinSet
  }
}
