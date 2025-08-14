import {Character} from './characterComponent'
import {_SCHOOL_GIRL} from './_CHAR_DATA'
import {_CHARS_DATA} from './_CHAR_DATA'
export const charactersUi = () => {
  const characterBlock = document.querySelector('.character')
  const characterBlockOne = document.querySelector('.characterOne')
  const characterThree = document.querySelector('.characterThree')
  const satyrOne = document.querySelector('.satyrOne')
  const schoolGirl = new Character({
    skin: _SCHOOL_GIRL.defoult,
    frameWidth: 128,
    frameHeight: 128,
    container: characterBlock,
  })
  const schoolGirl2 = new Character({
    skin: _SCHOOL_GIRL.defoult,
    frameWidth: 128,
    frameHeight: 128,
    container: characterBlockOne,
  })
  const schoolGirl3 = new Character({
    skin: _SCHOOL_GIRL.defoult,
    frameWidth: 128,
    frameHeight: 128,
    container: characterThree,
  })
  const satyr = new Character({
    skin: _CHARS_DATA[3].skinThree,
    frameWidth: 128,
    frameHeight: 128,
    container: satyrOne,
  })
  // schoolGirl.changeSkin(_SCHOOL_GIRL.skinThree)
  // schoolGirl3.changeSkin(_SCHOOL_GIRL.skinTwo)
  // schoolGirl.attack()
  // schoolGirl.walk()
  // schoolGirl.protect()
  // schoolGirl.attack()
  // schoolGirl2.attack()
  // schoolGirl.idle()
  // schoolGirl3.attack()
  // satyr.attack()
}
