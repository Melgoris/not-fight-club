import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'
import heroCloudImg from '/img/text_cloud_white.png'
import {addCloudText} from './helperFunc'
import {addHeroCloud} from './helperFunc'
import {
  getPickedHero,
  PlayerStorage,
  getStoreHero,
  setPickedHero,
  setStoreHero,
} from './storage'

import {addHeroLightContainer} from './helperFunc'
import {clearHeroLight, createBtn} from './helperFunc'
import {heroLightActive} from './helperFunc'
import {moveHeroToPortal} from './helperFunc'
import {delay} from './helperFunc'
import {addRemovePortal} from './portals'

export const charactersUi = async () => {
  const characterUi = document.querySelector('.character-ui')
  // await delay(100)
  const chooseButton = createBtn(
    'choose-hero-button',
    'choose-hero-btn',
    'Choose',
  )
  characterUi.appendChild(chooseButton)
  const heroes = _CHARS.map(hero => {
    const heroContainer = document.createElement('div')
    heroContainer.id = hero.id
    heroContainer.classList.add(hero.class, 'char-padding')
    characterUi.appendChild(heroContainer)
    addHeroCloud({
      parentContainer: heroContainer,
      src: heroCloudImg,
      text: hero.text,
    })
    addHeroLightContainer(hero.id)
    heroContainer.addEventListener('click', () => {
      setPickedHero({
        id: hero.id,
        name: hero.name,
        text: hero.text,
      })
      setStoreHero({
        id: hero.id,
        name: hero.name,
        text: hero.text,
        class: hero.class,
        skins: hero.skins,
        index: hero.index,
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
      PlayerStorage.heroSelected(false)
    })
  })
  addCloudText('school_girl', 'ууу бля')

  chooseButton?.addEventListener('click', async () => {
    const storeHero = getStoreHero()
    const pickedHero = getPickedHero()
    // console.log('storeHero', storeHero)
    // console.log('pickedHero', pickedHero)
    // return
    if (!pickedHero.pickedHeroData) return
    heroes.forEach(e => {
      if (e.container.id !== pickedHero.id) {
        e.container.classList.add('opasity')
      }
    })
    PlayerStorage.updateStoreHero(storeHero)
    PlayerStorage.heroSelected(true)
    await delay(600)
    clearHeroLight()
    pickedHero.pickedHeroData.container.classList.add('move-hero')
    pickedHero.pickedHeroData.walk()
    addRemovePortal('portal', true, '_characterUi')
    moveHeroToPortal(pickedHero.pickedHeroData.container)
    await delay(3600)
    pickedHero.pickedHeroData.container.classList.add('opasity')
    await delay(300)
    addRemovePortal('portal', false, '_characterUi')
    window.location.hash = '#home'
  })
}
