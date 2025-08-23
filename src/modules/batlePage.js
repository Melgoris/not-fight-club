import {_DUNGEONS_LOCATION_DATA} from './_OBJECT_DATA'
import {_CHANGE_SKIN_EFF} from './_EFFECT_DATA'
import {CombatUnit} from './unitFightComponent'
import {PlayerStorage} from './storage'
import {getStoreHero, getFullStore} from './storage'
import {_BOSES_DATA} from './_ENEMY_DATA'
import {createBtn} from './helperFunc'
import {delay, buttleHeroUi} from './helperFunc'
import {AEffects} from './effectsComponent'
import {_CHARS} from './_CHAR_DATA'
import {Battle} from './battleComponent'

export const battlePageUi = async () => {
  // const chooseButton = createBtn(
  //   'choose-hero-button',
  //   'choose-hero-btn',
  //   'Attack!',
  // )
  // const heroData = getStoreHero().id
  //   ? getStoreHero()
  //   : PlayerStorage.get().storeHero
  const fullStore = getStoreHero().id ? getFullStore() : PlayerStorage.get()
  const heroData = fullStore.storeHero
  const batleContainer = document.querySelector('#_battlePage')
  const logContainer = document.createElement('div')
  const logTitle = document.createElement('p')
  logTitle.classList.add('log-title')
  logContainer.classList.add('log-container')
  logTitle.textContent = 'Logs'
  batleContainer.appendChild(logTitle)
  const locationName = fullStore?.arenaUi?.location.toLowerCase()
  console.log(heroData)
  console.log('fullStore', fullStore)
  console.log('loca', fullStore.arenaUi.location)
  console.log('loca111', locationName)
  // batleContainer.appendChild(chooseButton)
  // batleContainer.style.backgroundImage = `url(${_DUNGEONS_LOCATION_DATA.swamps.src})`
  batleContainer.style.backgroundImage = `url(${_DUNGEONS_LOCATION_DATA[locationName].src})`
  batleContainer.appendChild(logContainer)
  logTitle.addEventListener('click', () => {
    logContainer.classList.toggle('active')
  })
  const hero = new CombatUnit({
    skin: heroData.skins.defoult,
    frameWidth: 128,
    frameHeight: 128,
    wtapperClassName: heroData.class,
    wrapperId: heroData.id,
    damage: 15,
    renderSection: batleContainer,
    mana: 100,
  })
  // hero.idle()
  const boss = new CombatUnit({
    skin: _BOSES_DATA[2].data.skin,
    ..._BOSES_DATA[2].data.options,
    // frameWidth: 96,
    // frameHeight: 76,
    // hp: 200,
    // maxHp: 200,
    // damage: 20,
    // wrapperId: '_skeleton',
    wtapperClassName: 'hero-container boss-flip',
    renderSection: batleContainer,
  })
  // boss.idle()
  const spellEffect = document.createElement('div')
  spellEffect.classList.add('hero-spell-effect')
  const heroSpellsAnim = new AEffects({
    effect: _CHANGE_SKIN_EFF.heroSpellEff,
    frameWidth: 64,
    frameHeight: 64,
    container: spellEffect,
  })
  hero.container.appendChild(spellEffect)
  // console.log('heroSpellsAnim', heroSpellsAnim)
  const battleUicomp = buttleHeroUi(batleContainer, _CHARS[0].spells)
  // const {fightBtn, getSelectedSpell} = battleUicomp
  // fightBtn.addEventListener('click', () => {
  //   console.log('battleUicomp', getSelectedSpell())
  // })
  const battle = new Battle({
    hero,
    enemy: boss,
    ui: battleUicomp,
    spellAnim: heroSpellsAnim,
    logs: logContainer,
  })
  battle.start()
  // chooseButton.addEventListener('click', async () => {
  //   hero.attack()
  //   await delay(100)
  //   // boss.attack()
  //   heroSpellsAnim.create()
  //   await delay(500)
  //   heroSpellsAnim.hit()
  //   await delay(100)
  //   heroSpellsAnim.explode()
  // })
}
