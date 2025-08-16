import {PlayerStorage} from './storage'
import {getFullStore, getPickedHero, getStoreHero} from './storage'
import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'

export const heroHomeUi = () => {
  const heroData = getStoreHero().id
    ? getStoreHero()
    : PlayerStorage.get().storeHero

  const homeUi = document.querySelector('#_heroHome')
  const heroContainer = document.createElement('div')
  heroContainer.id = heroData.id
  heroContainer.classList.add(heroData.class)
  homeUi.appendChild(heroContainer)

  const hero = new Character({
    skin: heroData.skins.defoult,
    frameWidth: 128,
    frameHeight: 128,
    container: heroContainer,
  })
  hero.walk()
  console.log('PlayerStorage.get()', PlayerStorage.get().storeHero)
  console.log('getStoreHero()', getStoreHero())
  console.log('heroData', heroData)
}
