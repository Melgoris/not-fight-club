import {PlayerStorage} from './storage'

export const routesUi = () => {
  const mainMenu = document.querySelector('.top-menu-container')
  const routes = {
    '#login': showLoginScreen,
    '#character': showCharacterScreen,
  }

  function router() {
    const hash = window.location.hash || '#login'
    Object.values(routes).forEach(fn => fn(false))
    if (routes[hash]) {
      routes[hash](true)
    } else {
      window.location.hash = '#login'
    }
  }

  function showLoginScreen(active) {
    mainMenu.classList.remove('active')

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
    mainMenu.classList.add('active')
    if (!active) return

    const player = PlayerStorage.get()
    if (!player) {
      window.location.hash = '#login'
      return
    }

    document.getElementById('displayPlayerName').textContent = player.username
    document.getElementById('wins').textContent = player.wins
    document.getElementById('losses').textContent = player.losses

    document.getElementById('win-btn').onclick = () => {
      PlayerStorage.addWin()
      document.getElementById('wins').textContent = PlayerStorage.get().wins
    }

    document.getElementById('loss-btn').onclick = () => {
      PlayerStorage.addLoss()
      document.getElementById('losses').textContent = PlayerStorage.get().losses
    }

    document.getElementById('logout-btn').onclick = () => {
      PlayerStorage.clear()
      window.location.hash = '#login'
    }
  }

  window.addEventListener('hashchange', router)
  window.addEventListener('load', () => {
    if (PlayerStorage.get()) {
      window.location.hash = '#character'
    }
    router()
  })
}
