import {Character} from './characterComponent'
import {_SCHOOL_GIRL} from './_CHAR_DATA'
export const charactersUi = () => {
  const characterBlock = document.querySelector('.character')
  const schoolGirl = new Character({
    skin: _SCHOOL_GIRL.defoult,
    frameWidth: 128,
    frameHeight: 128,
    fps: 8,
    container: characterBlock,
  })
  // schoolGirl.idle()
  // schoolGirl.attack()
  schoolGirl.walk()
}
