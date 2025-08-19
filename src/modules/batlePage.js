import {_DUNGEONS_LOCATION_DATA} from './_OBJECT_DATA'
import {CombatUnit} from './unitFightComponent'
import {PlayerStorage} from './storage'
import {getStoreHero} from './storage'
import {_BOSES_DATA} from './_ENEMY_DATA'
import {createBtn} from './helperFunc'
import {delay} from './helperFunc'

export const battlePageUi = async () => {
  const chooseButton = createBtn(
    'choose-hero-button',
    'choose-hero-btn',
    'Attack!',
  )
  const heroData = getStoreHero().id
    ? getStoreHero()
    : PlayerStorage.get().storeHero
  const batleContainer = document.querySelector('#_battlePage')
  batleContainer.appendChild(chooseButton)
  batleContainer.style.backgroundImage = `url(${_DUNGEONS_LOCATION_DATA.swamps.src})`

  const hero = new CombatUnit({
    skin: heroData.skins.defoult,
    frameWidth: 128,
    frameHeight: 128,
    wtapperClassName: heroData.class,
    wrapperId: heroData.id,
    renderSection: batleContainer,
  })
  hero.idle()
  const boss = new CombatUnit({
    skin: _BOSES_DATA[2].sprites.skin,
    frameWidth: 96,
    frameHeight: 76,
    wtapperClassName: 'hero-container boss-flip',
    wrapperId: '_skeleton',
    renderSection: batleContainer,
  })
  boss.idle()
  chooseButton.addEventListener('click', async () => {
    hero.attack()
    await delay(700)
    boss.attack()
  })
}
