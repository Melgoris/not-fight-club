import {_DUNGEONS_LOCATION_DATA} from './_OBJECT_DATA'
import {_CHANGE_SKIN_EFF} from './_EFFECT_DATA'
import {CombatUnit} from './unitFightComponent'
import {PlayerStorage} from './storage'
import {getStoreHero} from './storage'
import {_BOSES_DATA} from './_ENEMY_DATA'
import {createBtn} from './helperFunc'
import {delay, buttleHeroUi} from './helperFunc'
import {AEffects} from './effectsComponent'
import {_CHARS} from './_CHAR_DATA'
import {Battle} from './battleComponent'

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
  // batleContainer.appendChild(chooseButton)
  batleContainer.style.backgroundImage = `url(${_DUNGEONS_LOCATION_DATA.swamps.src})`

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
    skin: _BOSES_DATA[2].sprites.skin,
    frameWidth: 96,
    frameHeight: 76,
    hp: 200,
    maxHp: 200,
    damage: 20,
    wtapperClassName: 'hero-container boss-flip',
    wrapperId: '_skeleton',
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
  console.log('heroSpellsAnim', heroSpellsAnim)
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
