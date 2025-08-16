import {PlayerStorage} from './storage'
import {getFullStore, getPickedHero, getStoreHero} from './storage'
import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'
import {addCloudText} from './helperFunc'
import {addHeroCloud} from './helperFunc'
import heroCloudImg from '/img/text_cloud_white.png'
import {delay} from './helperFunc'
import {moveHeroToObject} from './helperFunc'
import {createSceneObjectElement} from './helperFunc'
import {_GIRL_DEALER} from './_OBJECT_DATA'

export const heroHomeUi = async () => {
  const heroData = getStoreHero().id
    ? getStoreHero()
    : PlayerStorage.get().storeHero
  const homeUi = document.querySelector('#_heroHome')
  const stone = createSceneObjectElement({
    id: '_stone',
    className: 'stone',
    parent: homeUi,
    x: 450,
    y: 757,
    top: false,
  })
  const tent = createSceneObjectElement({
    id: '_tent',
    className: 'tent',
    parent: homeUi,
    x: 658,
    y: 700,
    top: false,
  })
  const heroContainer = document.createElement('div')
  heroContainer.id = heroData.id
  heroContainer.classList.add(heroData.class)
  homeUi.appendChild(heroContainer)
  const dealerContainer = document.createElement('div')
  dealerContainer.id = '_dealer'
  dealerContainer.classList.add('dealer')
  homeUi.appendChild(dealerContainer)
  const girlDealer = new Character({
    skin: _GIRL_DEALER.defoult,
    frameWidth: 48,
    frameHeight: 48,
    container: dealerContainer,
  })
  girlDealer.idle()
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
  const moveHeroMainWithAnimation = async ({
    heroContainer = null,
    obj = null,
    shift = null,
    heroId = '',
    cloudText = '',
  }) => {
    hero.walk()
    moveHeroToObject(heroContainer, obj, shift)
    await delay(3000)
    hero.idle()
    await delay(700)
    addCloudText(heroId, cloudText)
  }

  // console.log(heroContainer.getBoundingClientRect())
  // console.log(stone.getBoundingClientRect())
  // console.log(stone)
  heroContainer.addEventListener('click', () => {
    console.log('dfdfd', heroData)
    addCloudText('satyr', 'ууу бля')
  })

  moveHeroMainWithAnimation({
    heroContainer,
    obj: stone,
    shift: 100,
    heroId: heroData.id,
    cloudText: 'Где это я..',
  })
  tent.addEventListener('click', () => {
    tent.classList.add('shake')

    tent.addEventListener(
      'animationend',
      () => {
        tent.classList.remove('shake')
      },
      {once: true},
    )
  })
}
