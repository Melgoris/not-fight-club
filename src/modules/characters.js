import {Character} from './characterComponent'
export const charactersUi = () => {
  const characterBlock = document.querySelector('.character')
  const schoolGirlDefoult = new Character({
    sprite: '/img/characters/schoolGirl/Idle.png',
    frameWidth: 128,
    frameHeight: 128,
    totalFrames: 9,
    fps: 8,
    container: characterBlock,
  })
  schoolGirlDefoult.idle()
}
