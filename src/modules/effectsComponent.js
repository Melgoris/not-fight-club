export class AEffects {
  constructor({effect, frameWidth, frameHeight, container}) {
    this.effect = effect
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
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

  _animate({sprite, totalFrames, fps, loop = false}) {
    clearInterval(this.intervalId)
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
        }
      }
    }, frameTime)
  }
  changeSkin() {
    const {sprite, totalFrames, fps} = this.effect.changeSkin

    this._animate({sprite, totalFrames, fps})
  }
}
