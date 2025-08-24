import {PlayerStorage} from './storage'
import {destroyInactiveWindows} from './helperFunc'
import {charactersUi} from './characters'
import {heroHomeUi} from './heroHome'
import {delay} from './helperFunc'
import {battlePageUi} from './batlePage'

export const routesUi = () => {
  // const mainMenu = document.querySelector('.top-menu-container')
  const routes = {
    '#login': showLoginScreen,
    '#character': showCharacterScreen,
    '#home': showHeroHomepage,
    '#battle': showBattlepage,
  }

  function router() {
    const hash = window.location.hash || '#login'
    Object.values(routes).forEach(fn => fn(false))
    if (routes[hash]) {
      routes[hash](true)
    } else {
      window.location.hash = '#login'
    }
    destroyInactiveWindows()
  }

  function showLoginScreen(active) {
    // mainMenu.classList.remove('active')

    const screen = document.getElementById('_login')
    screen.classList.toggle('active', active)
    if (!active) return

    document.getElementById('loginBtn').onclick = async () => {
      const name = document.getElementById('playerName').value.trim()
      if (!name) return alert('Enter Name!')
      PlayerStorage.setName(name)
      screen.classList.toggle('hide', active)
      await delay(400)
      window.location.hash = '#character'
    }
  }

  async function showCharacterScreen(active) {
    const screen = document.getElementById('_characterUi')
    screen.classList.toggle('active', active)
    // mainMenu.classList.add('active')
    if (!active) return
    const player = PlayerStorage.get()
    const heroSelected = PlayerStorage.isHeroSelect()
    // console.log('player', player)
    if (!player) {
      window.location.hash = '#login'
      return
    }
    if (player.storeHero && heroSelected && window.location.hash !== '#home') {
      window.location.hash = '#home'
    }
    charactersUi()
    await delay(300)
  }

  async function showHeroHomepage(active) {
    const screen = document.getElementById('_heroHome')
    screen.classList.toggle('active', active)
    if (!active) return
    const data = PlayerStorage.get()
    const heroSelected = PlayerStorage.isHeroSelect()
    if (!data) {
      window.location.hash = '#login'
      return
    }
    if (
      !data.storeHero &&
      !heroSelected &&
      window.location.hash !== '#character'
    ) {
      window.location.hash = '#character'
    }
    heroHomeUi()
    await delay(300)
  }
  async function showBattlepage(active) {
    const screen = document.getElementById('_battlePage')
    screen.classList.toggle('active', active)
    if (!active) return
    const data = PlayerStorage.get()
    const arenaData = PlayerStorage.getArena()
    if (!data) {
      window.location.hash = '#login'
      return
    }

    if (!arenaData.location && window.location.hash !== '#battle') {
      window.location.hash = '#home'
    }
    battlePageUi()
    await delay(300)
  }
  window.addEventListener('hashchange', router)
  window.addEventListener('load', () => {
    const player = PlayerStorage.getArena()
    const playerhome = PlayerStorage.get()
    const heroSelected = PlayerStorage.isHeroSelect()
    console.log('heroSelected', heroSelected)
    if (!playerhome) {
      window.location.hash = '#login'
    } else if (player?.location && heroSelected) {
      window.location.hash = '#battle'
    } else if (playerhome?.storeHero && heroSelected) {
      window.location.hash = '#home'
    } else {
      window.location.hash = '#character'
    }
    router()
  })
}
