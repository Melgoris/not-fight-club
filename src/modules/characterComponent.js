export class Character {
  constructor({sprite, frameWidth, frameHeight, totalFrames, fps, container}) {
    this.sprite = sprite
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.totalFrames = totalFrames
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
    this.element.style.backgroundImage = `url(${this.sprite})`
    this.element.style.backgroundRepeat = 'no-repeat'
    this.element.style.imageRendering = 'pixelated'
    this.container.appendChild(this.element)
  }

  _animate(startFrame, endFrame, loop = true, onFinish) {
    clearInterval(this.intervalId)
    this.currentFrame = startFrame
    const frameTime = 1000 / this.fps

    this.intervalId = setInterval(() => {
      this.element.style.backgroundPositionX = `-${
        this.currentFrame * this.frameWidth
      }px`
      this.currentFrame++

      if (this.currentFrame > endFrame) {
        if (loop) {
          this.currentFrame = startFrame
        } else {
          clearInterval(this.intervalId)
          if (onFinish) onFinish()
        }
      }
    }, frameTime)
  }

  idle() {
    this._animate(0, this.totalFrames - 1, true)
  }
}
