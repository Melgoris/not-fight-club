import {PlayerStorage} from './storage'
import {getFullStore, getPickedHero, getStoreHero} from './storage'
import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'
import {addCloudText} from './helperFunc'
import {addHeroCloud} from './helperFunc'
import heroCloudImg from '/img/text_cloud_white.png'
import {delay} from './helperFunc'

export const heroHomeUi = async () => {
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
  addHeroCloud({
    parentContainer: heroContainer,
    src: heroCloudImg,
    text: heroData.text,
  })
  hero.idle()
  await delay(100)
  addCloudText('satyr', 'ууу бля')
  heroContainer.addEventListener('click', () => {
    console.log('dfdfd')
    addCloudText('satyr', 'ууу бля')
  })
}
