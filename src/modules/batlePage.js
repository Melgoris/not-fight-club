import {_DUNGEONS_LOCATION_DATA} from './_OBJECT_DATA'
import {_CHANGE_SKIN_EFF} from './_EFFECT_DATA'
import {CombatUnit} from './unitFightComponent'
import {PlayerStorage} from './storage'
import {getStoreHero, getFullStore, getCombatData} from './storage'
import {_BOSES_DATA} from './_ENEMY_DATA'
import {createBtn} from './helperFunc'
import {delay, buttleHeroUi} from './helperFunc'
import {AEffects} from './effectsComponent'
import {_CHARS} from './_CHAR_DATA'
import {_BUFFS_DEBUFFS, _BUFFS_DEBUFFS_NAMES} from './_EFFECT_DATA'
import {Battle} from './battleComponent'
import {addHeroCloud, addCloudText} from './helperFunc'
import heroCloudImg from '/img/text_cloud_white.png'

export const battlePageUi = async () => {
  const batleContainer = document.querySelector('#_battlePage')
  batleContainer.innerHTML = ''
  // const heroData = getStoreHero().id
  //   ? getStoreHero()
  //   : PlayerStorage.get().storeHero
  const fullStore = getStoreHero().id ? getFullStore() : PlayerStorage.get()
  const heroData = fullStore.storeHero

  // const arenaData = getCombatData().heroHp
  //   ? getCombatData()
  //   : PlayerStorage.get().arenaUi
  const arenaData = getCombatData().heroHp
    ? getCombatData()
    : PlayerStorage.getArena()

  // console.log('arenaData', arenaData)
  // console.log('getCombatData()', PlayerStorage.getArena())
  if (!arenaData?.location) {
    window.location.hash = '#home'
    return
  }
  const cloudData = {heroCloudImg, addHeroCloud, addCloudText}
  const bToHome = createBtn('go-home-btn', '_goHomeBtn', '<  Go home')
  bToHome.classList.add('go-home-btn-cont')
  const logContainer = document.createElement('div')
  const logTitle = document.createElement('p')
  logTitle.classList.add('log-title')
  logContainer.classList.add('log-container')
  logTitle.textContent = 'Logs'
  batleContainer.appendChild(logTitle)
  const locationName = arenaData?.location?.toLowerCase()
  // const bossId = fullStore?.arenaUi?.boss
  const bossId = arenaData?.boss
  // console.log(_CHARS[heroData?.index]?.data)
  // console.log('fullStore', fullStore)
  // console.log('arenaData', arenaData)
  // console.log('loca111', locationName)
  batleContainer.appendChild(bToHome)
  // batleContainer.style.backgroundImage = `url(${_DUNGEONS_LOCATION_DATA.swamps.src})`
  batleContainer.style.backgroundImage = `url(${_DUNGEONS_LOCATION_DATA[locationName]?.src})`

  batleContainer.appendChild(logContainer)
  logTitle.addEventListener('click', () => {
    logContainer.classList.toggle('active')
  })
  // console.log('arenaData?.boss', arenaData?.boss)
  // console.log('boss', _BOSES_DATA[bossId])
  const hero = new CombatUnit({
    skin: heroData.currentSkin || heroData.skins.defoult,
    frameWidth: 128,
    frameHeight: 128,
    wtapperClassName: heroData.class,
    wrapperId: heroData.id,
    cloudData,
    renderSection: batleContainer,
    ..._CHARS[heroData?.index]?.data,
    ...(arenaData?.heroHp
      ? {
          hp: arenaData.heroHp,
          maxHp: arenaData.heroMaxHp,
          mana: arenaData.heroMana,
          maxMana: arenaData.heroMaxMana,
        }
      : {}),
  })

  // hero.idle()
  const boss = new CombatUnit({
    skin: _BOSES_DATA[bossId]?.data?.skin,
    ..._BOSES_DATA[bossId]?.data?.options,
    cloudData,
    ...(arenaData?.bossHp
      ? {hp: arenaData.bossHp, maxHp: arenaData.bossMaxHp}
      : {}),
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
  const buffsCont = document.createElement('div')
  const debuffCont = document.createElement('div')
  debuffCont.classList.add('target-debuff-effect')
  buffsCont.classList.add('target-buff-effect')
  boss.container.appendChild(debuffCont)
  hero.container.appendChild(buffsCont)
  const debuffsAnimations = new AEffects({
    effect: _BUFFS_DEBUFFS.debuffs.burnGreen,
    frameWidth: 24,
    frameHeight: 32,
    container: debuffCont,
  })
  const buffsAnimations = new AEffects({
    effect: _BUFFS_DEBUFFS.buffs,
    frameWidth: 128,
    frameHeight: 128,
    container: buffsCont,
  })
  // const buffDebuffs = _BUFFS_DEBUFFS_NAMES.reduce((acc, name) => {
  //   acc[name] = new AEffects({
  //     ..._BUFFS_DEBUFFS[name],
  //     container: spellEffect,
  //   })
  //   return acc
  // }, {})

  // console.log('buffDebuffs', buffDebuffs)
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
    // buffDebuffs,
    btnHome: bToHome,
    bossId,
    locationName,
    debuffsAnimations,
    buffsAnimations,
  })
  battle.start()
  // bToHome.addEventListener('click', async () => {
  //   console.log('aatatat')
  // })
}
