import {PlayerStorage} from './storage'
import {getFullStore, getPickedHero, getStoreHero} from './storage'
import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'
import {addCloudText} from './helperFunc'
import {addHeroCloud} from './helperFunc'
import heroCloudImg from '/img/text_cloud_white.png'
import {delay} from './helperFunc'
import {moveHeroToObject} from './helperFunc'
import {
  createSceneObjectElement,
  createWeatherElement,
  createModalMenu,
  createModalMenuBtn,
} from './helperFunc'
import {
  _CLOUDS_DATA,
  _GIRL_DEALER,
  _HOME_LOCATION_OBJ,
  _HOME_LOCATION_OBJ_NAMES,
  _CLOUDS_NAME,
} from './_OBJECT_DATA'
import {addRemovePortal} from './portals'

export const heroHomeUi = async () => {
  // await delay(100)
  const heroData = getStoreHero().id
    ? getStoreHero()
    : PlayerStorage.get().storeHero
  const homeUi = document.querySelector('#_heroHome')

  const homeLocationObjects = _HOME_LOCATION_OBJ_NAMES.reduce((acc, name) => {
    acc[name] = createSceneObjectElement({
      ..._HOME_LOCATION_OBJ[name],
      parent: homeUi,
    })
    return acc
  }, {})
  const homeClouds = _CLOUDS_NAME.reduce((acc, name) => {
    acc[name] = createWeatherElement({..._CLOUDS_DATA[name]})
    return acc
  }, {})

  homeClouds.cloudOne.classList.add('cloudsmall')
  homeClouds.cloudTwo.classList.add('cloudsmalllower')
  homeClouds.cloudThree.classList.add('cloudsmalllower')
  homeClouds.cloudFour.classList.add('cloudy')
  homeClouds.fogOne.classList.add('fogshace')
  homeClouds.portalFogOne.classList.add('fogshace')
  ;(() => {
    setInterval(async () => {
      homeClouds.portalFogTwo.classList.add('ghost-active')
      await delay(2000)
      homeClouds.portalFogTwo.classList.remove('ghost-active')
    }, 10000)
  })()

  homeUi.appendChild(homeClouds.cloudOne)
  homeUi.appendChild(homeClouds.cloudTwo)
  homeUi.appendChild(homeClouds.cloudThree)
  homeUi.appendChild(homeClouds.cloudFour)
  homeUi.appendChild(homeClouds.fogOne)
  homeUi.appendChild(homeClouds.portalFogOne)
  homeUi.appendChild(homeClouds.portalFogTwo)

  homeUi.appendChild(homeClouds.portalFogTwo)
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
  addHeroCloud({
    parentContainer: dealerContainer,
    src: heroCloudImg,
    text: 'Карр!',
  })
  // addCloudText('_dealer', 'Fnfnfnf')
  await delay(100)

  // const d = document.querySelector('#_dealer')
  dealerContainer.addEventListener('click', () => {
    addCloudText('_dealer', 'К-арр!')
  })
  // hero.changeSkin(heroData.skins.skinTwo)
  hero.idle()
  await delay(100)
  // addCloudText('satyr', 'ууу бля')
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

  const skinModal = createModalMenu({
    id: '_skinModal',
    name: 'skinmodal',
    parent: homeUi,
  })
  console.log(skinModal)
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
  const correntHeroSkins = heroData.skins
  console.log(heroData.skins)
  Object.values(correntHeroSkins).map((skin, i) => {
    const button = createModalMenuBtn({src: skin.logo})
    skinModal.appendChild(button)
    button.addEventListener('click', () => {
      hero.changeSkin({...skin})
      hero.idle()
    })
  })
  // console.log(_CHARS.find(e => e.name === heroData.name))
  homeLocationObjects.map.classList.add('mapshake')

  addRemovePortal('portal', true, '_heroHome').classList.add('home-portal')
}
