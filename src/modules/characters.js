import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'
import heroCloudImg from '/img/text_cloud_white.png'
import {addCloudText} from './helperFunc'
import {addHeroCloud} from './helperFunc'
import {getPickedHero} from './storage'
import {setPickedHero} from './storage'

import {addRemovePortal} from './portals'

export const charactersUi = () => {
  const chooseButton = document.querySelector('#choose-hero-btn')

  const addHeroLightContainer = containerId => {
    const heroLight = document.createElement('div')
    heroLight.classList.add('hero-light')
    document.querySelector(`#${containerId}`).appendChild(heroLight)
  }
  const clearHeroLight = () => {
    document
      .querySelectorAll('.hero-container')
      .forEach(h => h.classList.remove('selected'))
  }
  const heroLightActive = id => {
    clearHeroLight()
    document.querySelector(`#${id}`).classList.add('selected')
  }
  const moveHeroToPortal = heroEl => {
    const portalEl = document.querySelector('#portal')
    const heroRect = heroEl.getBoundingClientRect()
    const portalRect = portalEl.getBoundingClientRect()
    let deltaX = portalRect.left - heroRect.left
    let deltaY = portalRect.top - heroRect.top
    if (heroEl.id === 'gorgon') deltaX = deltaX - 45
    heroEl.style.transition = 'transform 3s linear'
    heroEl.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    setTimeout(() => {
      heroEl.style.transition = 'transform 0.5s ease-out'
      heroEl.style.transform = `translate(${deltaX}px, ${deltaY - 40}px)`
    }, 3000)
  }

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

  chooseButton.addEventListener('click', () => {
    const pickedHero = getPickedHero()
    if (!pickedHero.pickedHeroData) return
    console.log(pickedHero.pickedHeroData.container)
    heroes.forEach(e => {
      if (e.container.id !== pickedHero.id) {
        e.container.classList.add('opasity')
      }
    })
    setTimeout(() => {
      clearHeroLight()
      pickedHero.pickedHeroData.container.classList.add('move-hero')
      pickedHero.pickedHeroData.walk()
      addRemovePortal('add')
      moveHeroToPortal(pickedHero.pickedHeroData.container)

      setTimeout(() => {
        pickedHero.pickedHeroData.container.classList.add('opasity')
        // addRemovePortal()
      }, 3600)
    }, 600)
  })
}
