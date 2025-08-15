import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'
import heroCloudImg from '/img/text_cloud_white.png'
import {addCloudText} from './helperFunc'
import {addHeroCloud} from './helperFunc'
import {getPickedHero} from './storage'
import {setPickedHero} from './storage'
import {portal} from './portals'

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
    console.log(pickedHero)
    heroes.forEach(e => {
      if (e.container.id !== pickedHero.id) {
        e.container.classList.add('opasity')
      }
    })
    setTimeout(() => {
      pickedHero.pickedHeroData.container.classList.add('move-hero')
      pickedHero.pickedHeroData.walk()
    }, 600)
  })

  portal.portal()
}
