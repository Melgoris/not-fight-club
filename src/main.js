import './style.css'
import {routesUi} from './modules/routes'
import {headerMenuUi} from './modules/headerMenu'
import {charactersUi} from './modules/characters'
import {heroHomeUi} from './modules/heroHome'

function resizeScene() {
  const scene = document.querySelector('.character-homepage')
  const scaleX = window.innerWidth / 1600
  const scaleY = window.innerHeight / 900
  const scale = Math.min(scaleX, scaleY)
  scene.style.transform = `scale(${scale})`
}
window.addEventListener('DOMContentLoaded', () => {
  routesUi()
  // headerMenuUi()
  // charactersUi()
  // heroHomeUi()
})
window.addEventListener('resize', resizeScene)
resizeScene()
