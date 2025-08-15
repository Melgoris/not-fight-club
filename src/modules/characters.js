import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'
import heroCloudImg from '/img/text_cloud_white.png'
import {addCloudText} from './helperFunc'
import {addHeroCloud} from './helperFunc'
import {getPickedHero} from './storage'
import {setPickedHero} from './storage'
import {addHeroLightContainer} from './helperFunc'
import {clearHeroLight} from './helperFunc'
import {heroLightActive} from './helperFunc'
import {moveHeroToPortal} from './helperFunc'
import {delay} from './helperFunc'

import {addRemovePortal} from './portals'

export const charactersUi = () => {
  const chooseButton = document.querySelector('#choose-hero-btn')

  const heroes = _CHARS.map(hero => {
    const characterUi = document.querySelector('.character-ui')
    const heroContainer = document.createElement('div')
    heroContainer.id = hero.id
    heroContainer.classList.add(hero.class)
    characterUi.appendChild(heroContainer)
    addHeroCloud({
      parentContainer: heroContainer,
      src: heroCloudImg,
      text: hero.text,
    })
    addHeroLightContainer(hero.id)
    // console.log('hero', hero)
    heroContainer.addEventListener('click', () => {
      setPickedHero({
        id: hero.id,
        name: hero.name,
        text: hero.text,
      })
    })
    return new Character({
      skin: hero.skins.defoult,
      frameWidth: 128,
      frameHeight: 128,
      container: heroContainer,
    })
  })

  heroes.forEach(hero => {
    hero.idle()
    hero.container.addEventListener('click', () => {
      const {id, name, text} = getPickedHero()
      setPickedHero({pickedHeroData: hero})
      addCloudText(id, text)
      heroLightActive(id)
    })
  })
  addCloudText('school_girl', 'ууу бля')

  chooseButton.addEventListener('click', async () => {
    const pickedHero = getPickedHero()
    if (!pickedHero.pickedHeroData) return
    console.log(pickedHero.pickedHeroData.container)
    heroes.forEach(e => {
      if (e.container.id !== pickedHero.id) {
        e.container.classList.add('opasity')
      }
    })
    await delay(600)
    clearHeroLight()
    pickedHero.pickedHeroData.container.classList.add('move-hero')
    pickedHero.pickedHeroData.walk()
    addRemovePortal('add')
    moveHeroToPortal(pickedHero.pickedHeroData.container)
    await delay(3600)
    pickedHero.pickedHeroData.container.classList.add('opasity')
    await delay(300)
    addRemovePortal()
  })
}
