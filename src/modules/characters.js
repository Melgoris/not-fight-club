import {Character} from './characterComponent'

import {_CHARS} from './_CHAR_DATA'
export const charactersUi = () => {
  const characterBlock = document.querySelector('.character')
  const schoolGirl = new Character({
    skin: _CHARS[0].skins.defoult,
    frameWidth: 128,
    frameHeight: 128,
    container: characterBlock,
  })

  schoolGirl.idle()
  // schoolGirl3.attack()
  // satyr.attack()
}
