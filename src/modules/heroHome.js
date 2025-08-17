import {PlayerStorage} from './storage'
import {getFullStore, getPickedHero, getStoreHero} from './storage'
import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'
import {addCloudText} from './helperFunc'
import {addHeroCloud} from './helperFunc'
import heroCloudImg from '/img/text_cloud_white.png'
import {delay} from './helperFunc'
import {moveHeroToObject} from './helperFunc'
import {createSceneObjectElement, createWeatherElement} from './helperFunc'
import {
  _CLOUDS,
  _GIRL_DEALER,
  _HOME_LOCATION_OBJ,
  _HOME_LOCATION_OBJ_NAMES,
} from './_OBJECT_DATA'
import {addRemovePortal} from './portals'

export const heroHomeUi = async () => {
  const heroData = getStoreHero().id
    ? getStoreHero()
    : PlayerStorage.get().storeHero
  const homeUi = document.querySelector('#_heroHome')

  const fullSizeFog = createSceneObjectElement({
    id: '_full-page-fog',
    className: 'full-page-fog',
    parent: homeUi,
    x: 10,
    y: 10,
    top: false,
  })

  const homeLocationObjects = _HOME_LOCATION_OBJ_NAMES.reduce((acc, name) => {
    acc[name] = createSceneObjectElement({
      ..._HOME_LOCATION_OBJ[name],
      parent: homeUi,
    })
    return acc
  }, {})
  console.log('homeLocationObjects', homeLocationObjects)
  const cloud = createWeatherElement({..._CLOUDS[0]})
  homeUi.appendChild(cloud)
  console.log('cloud', cloud)
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

  heroContainer.addEventListener('click', () => {
    console.log('dfdfd', heroData)
    addCloudText('satyr', 'ууу бля')
  })

  moveHeroMainWithAnimation({
    heroContainer,
    obj: homeLocationObjects.stone,
    shift: 100,
    heroId: heroData.id,
    cloudText: 'Где это я..',
  })
  homeLocationObjects.tent.addEventListener('click', () => {
    homeLocationObjects.tent.classList.add('shake')

    homeLocationObjects.tent.addEventListener(
      'animationend',
      () => {
        homeLocationObjects.tent.classList.remove('shake')
      },
      {once: true},
    )
  })
  homeLocationObjects.map.classList.add('mapshake')
  fullSizeFog.classList.add('fogshace')
  addRemovePortal('portal', true, '_heroHome').classList.add('home-portal')
}
