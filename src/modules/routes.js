import {PlayerStorage} from './storage'
import {destroyInactiveWindows} from './helperFunc'

export const routesUi = () => {
  // const mainMenu = document.querySelector('.top-menu-container')
  const routes = {
    '#login': showLoginScreen,
    '#character': showCharacterScreen,
    '#home': showHeroHomepage,
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

    document.getElementById('loginBtn').onclick = () => {
      const name = document.getElementById('playerName').value.trim()
      if (!name) return alert('Enter Name!')
      PlayerStorage.setName(name)
      window.location.hash = '#character'
    }
  }

  function showCharacterScreen(active) {
    const screen = document.getElementById('_characterUi')
    screen.classList.toggle('active', active)
    // mainMenu.classList.add('active')
    if (!active) return
    const player = PlayerStorage.get()
    // console.log('player', player)
    if (!player) {
      window.location.hash = '#login'
      return
    }
    if (player.storeHero && window.location.hash !== '#home')
      window.location.hash = '#home'
  }

  function showHeroHomepage(active) {
    const screen = document.getElementById('_heroHome')
    screen.classList.toggle('active', active)
    if (!active) return
    const data = PlayerStorage.get()
    console.log('active', active)
    if (!data) {
      window.location.hash = '#login'
      return
    }
    if (!data.storeHero && window.location.hash !== '#character')
      window.location.hash = '#character'
    // document.getElementById('displayPlayerName').textContent = player.username
    //     document.getElementById('wins').textContent = player.wins
    //     document.getElementById('losses').textContent = player.losses
    //     document.getElementById('win-btn').onclick = () => {
    //       PlayerStorage.addWin()
    //       document.getElementById('wins').textContent = PlayerStorage.get().wins
    //     }
    //     document.getElementById('loss-btn').onclick = () => {
    //       PlayerStorage.addLoss()
    //       document.getElementById('losses').textContent = PlayerStorage.get().losses
    //     }
    //     document.getElementById('logout-btn').onclick = () => {
    //       PlayerStorage.clear()
    //       window.location.hash = '#login'
    //     }
  }
  window.addEventListener('hashchange', router)
  window.addEventListener('load', () => {
    const player = PlayerStorage.get()
    console.log('player', player.storeHero ? 'yes' : 'no')
    if (!player) {
      window.location.hash = '#login'
    } else if (player.storeHero) {
      window.location.hash = '#home'
    } else {
      window.location.hash = '#character'
    }
    router()
  })
}
